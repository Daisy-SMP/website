import { GITHUB_TOKEN } from '$env/static/private';

const REPO = "Daisy-SMP/DaisySMPOrigins";
const BRANCH = "daisy-2";

const RAW = `https://raw.githubusercontent.com/${REPO}/${BRANCH}`;
const API = `https://api.github.com/repos/${REPO}`;

const githubHeaders = {
  Accept: "application/json",
  Authorization: `Bearer ${GITHUB_TOKEN}`
};

async function fetchJson(url: string) {
  const res = await fetch(url, { headers: githubHeaders });
  if (!res.ok) throw new Error(`Failed to fetch ${url}`);
  return res.json();
}

async function fetchRaw(path: string) {
  const res = await fetch(`${RAW}/${path}`, { headers: githubHeaders });
  if (!res.ok) throw new Error(`Failed to fetch ${path}`);
  return res.json();
}

interface Power {
  id: string;
  name: string;
  description: string;
}

interface Origin {
  id: string;
  name: string;
  description: string;
  icon: string;
  impact: number;
  powers: Power[];
}

let cache: { data: { origins: Origin[] }; timestamp: number } | null = null;
const CACHE_TTL = 60 * 60 * 1000;

export async function load({ fetch: svelteKitFetch, setHeaders }) {
  setHeaders({ 'cache-control': 'public, max-age=300' });

  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    return cache.data;
  }

  const tree = await fetchJson(`${API}/git/trees/${BRANCH}?recursive=1`);
  const files: string[] = tree.tree
    .filter((f: any) => f.type === 'blob')
    .map((f: any) => f.path);

  const originFilePaths = files.filter(p =>
    p.match(/^data\/[^/]+\/origins\/[^/]+\.json$/)
  );
  const langFilePaths = files.filter(p =>
    p.match(/^assets\/[^/]+\/lang\/en_us\.json$/)
  );

  const [langResults, originResults, staticLang, staticManifest] =
    await Promise.all([
      Promise.all(langFilePaths.map(p => fetchRaw(p).catch(() => ({})))),
      Promise.all(originFilePaths.map(p => fetchRaw(p).catch(() => null))),
      svelteKitFetch('/data/origins/lang/en_us.json')
        .then(r => r.json())
        .catch(() => ({})),
      svelteKitFetch('/data/origins/manifest.json')
        .then(r => r.json())
        .catch(() => []),
    ]);

  const langMerged: Record<string, string> = { ...staticLang };
  for (const lang of langResults) {
    Object.assign(langMerged, lang);
  }

  function resolvePower(powerId: string): Power | null {
    const [powerNs, ...rest] = powerId.split(':');
    const key = rest.join(':');

    const name = langMerged[`power.${powerNs}.${key}.name`] ?? null;
    if (!name) return null;

    return {
      id: powerId,
      name,
      description: langMerged[`power.${powerNs}.${key}.description`] ?? '',
    };
  }

  const staticOrigins: Origin[] = (await Promise.all(
    (staticManifest as string[]).map(async id => {
      const raw = await svelteKitFetch(`/data/origins/origins/${id}.json`)
        .then(r => r.json())
        .catch(() => null);
      if (!raw) return null;

      const powers = (raw.powers ?? [])
        .map(resolvePower)
        .filter((p: Power | null): p is Power => p !== null);

      return {
        id,
        name: langMerged[`origin.origins.${id}.name`] ?? id,
        description: langMerged[`origin.origins.${id}.description`] ?? '',
        icon: raw.icon,
        impact: raw.impact ?? 0,
        powers,
      };
    })
  )).filter((o): o is Origin => o !== null);

  const githubOrigins: Origin[] = (await Promise.all(
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
        description: langMerged[`origin.${ns}.${id}.description`] ?? '',
        icon: raw.icon,
        impact: raw.impact ?? 0,
        powers,
      };
    })
  )).filter((o): o is Origin => o !== null);

  const result = {
    origins: [...staticOrigins, ...githubOrigins].sort((a, b) => a.impact - b.impact)
  };

  cache = { data: result, timestamp: Date.now() };
  return result;
}