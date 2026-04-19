import { GITHUB_TOKEN } from "$env/static/private";
import type { Origin, Power } from "$lib/types";

const REPO = "Daisy-SMP/DaisySMPOrigins";
const BRANCH = "daisy-2";

const RAW = `https://raw.githubusercontent.com/${REPO}/${BRANCH}`;
const API = `https://api.github.com/repos/${REPO}`;

const githubHeaders = {
  Accept: "application/vnd.github+json",
  Authorization: `Bearer ${GITHUB_TOKEN}`,
  "User-Agent": "daisy-smp-cloudflare-worker",
};

async function fetchJson(url: string, fetchHeaders: HeadersInit) {
  const res = await fetch(url, { headers: fetchHeaders });

  const text = await res.text();

  if (!res.ok) {
    console.error("[GitHub API error]", {
      url,
      status: res.status,
      body: text,
    });

    throw new Error(`GitHub fetch failed: ${res.status}`);
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    console.error("[GitHub JSON parse error]", {
      url,
      body: text,
    });

    throw e;
  }
}

async function fetchJsonWithGithubHeaders(url: string) {
  return fetchJson(url, githubHeaders);
}

async function fetchRaw(path: string, fetchHeaders: HeadersInit) {
  const res = await fetch(`${RAW}/${path}`, { headers: fetchHeaders });
  if (!res.ok) throw new Error(`Failed to fetch ${path}`);
  return res.json();
}

async function fetchRawWithGithubHeaders(url: string) {
  return fetchRaw(url, githubHeaders);
}

let cache: {
  data: { origins: Origin[] };
  timestamp: number;
  sha: string;
} | null = null;
const CACHE_TTL = 30 * 60 * 1000;

async function getLatestSha(): Promise<string> {
  const res = await fetchJsonWithGithubHeaders(`${API}/commits/${BRANCH}`);
  return res.sha;
}

export async function load({ fetch: svelteKitFetch, setHeaders }) {
  setHeaders({ "cache-control": "public, max-age=300" });

  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    return cache.data;
  }

  const latestSha = await getLatestSha();

  if (cache && cache.sha === latestSha) {
    cache.timestamp = Date.now();
    return cache.data;
  }

  const tree = await fetchJsonWithGithubHeaders(
    `${API}/git/trees/${BRANCH}?recursive=1`,
  );
  const files: string[] = tree.tree
    .filter((f: any) => f.type === "blob")
    .map((f: any) => f.path);

  const originFilePaths = files.filter((p) =>
    p.match(/^data\/[^/]+\/origins\/[^/]+\.json$/),
  );
  const langFilePaths = files.filter((p) =>
    p.match(/^assets\/[^/]+\/lang\/en_us\.json$/),
  );

  const [langResults, originResults, staticLang, staticManifest] =
    await Promise.all([
      Promise.all(
        langFilePaths.map((p) =>
          fetchRawWithGithubHeaders(p).catch(() => ({})),
        ),
      ),
      Promise.all(
        originFilePaths.map((p) =>
          fetchRawWithGithubHeaders(p).catch(() => null),
        ),
      ),
      svelteKitFetch("/data/origins/lang/en_us.json")
        .then((r) => r.json())
        .catch(() => ({})),
      svelteKitFetch("/data/origins/manifest.json")
        .then((r) => r.json())
        .catch(() => []),
    ]);

  const langMerged: Record<string, string> = { ...staticLang };
  for (const lang of langResults) {
    Object.assign(langMerged, lang);
  }

  function resolvePower(powerId: string): Power | null {
    const [powerNs, ...rest] = powerId.split(":");
    const key = rest.join(":");

    const name = langMerged[`power.${powerNs}.${key}.name`] ?? null;
    if (!name) return null;

    return {
      id: powerId,
      name,
      description: langMerged[`power.${powerNs}.${key}.description`] ?? "",
    };
  }

  function resolveIcon(icon: unknown): string {
    if (typeof icon === "string") return icon;
    if (
      typeof icon === "object" &&
      icon !== null &&
      "item" in icon &&
      typeof (icon as any).item === "string"
    ) {
      return (icon as any).item;
    }
    return "";
  }

  const staticOrigins: Origin[] = (
    await Promise.all(
      (staticManifest as string[]).map(async (id) => {
        const raw = await svelteKitFetch(`/data/origins/origins/${id}.json`)
          .then((r) => r.json())
          .catch(() => null);
        if (!raw) return null;

        const powers = (raw.powers ?? [])
          .map(resolvePower)
          .filter((p: Power | null): p is Power => p !== null);

        return {
          id,
          name: langMerged[`origin.origins.${id}.name`] ?? id,
          description: langMerged[`origin.origins.${id}.description`] ?? "",
          icon: resolveIcon(raw.icon),
          impact: raw.impact ?? 0,
          powers,
        };
      }),
    )
  ).filter((o): o is Origin => o !== null);

  const githubOrigins: Origin[] = (
    await Promise.all(
      originFilePaths.map(async (p, i) => {
        const raw = originResults[i];
        if (!raw) return null;

        const match = p.match(/^data\/([^/]+)\/origins\/(.+)\.json$/);
        if (!match) return null;
        const [, ns, id] = match;

        const powers = (raw.powers ?? [])
          .map(resolvePower)
          .filter((p: Power | null): p is Power => p !== null);

        return {
          id,
          name: langMerged[`origin.${ns}.${id}.name`] ?? id,
          description: langMerged[`origin.${ns}.${id}.description`] ?? "",
          icon: resolveIcon(raw.icon),
          impact: raw.impact ?? 0,
          powers,
        };
      }),
    )
  ).filter((o): o is Origin => o !== null);

  const result = {
    origins: [...staticOrigins, ...githubOrigins].sort(
      (a, b) => a.impact - b.impact,
    ),
  };

  cache = { data: result, timestamp: Date.now(), sha: latestSha };
  return result;
}
