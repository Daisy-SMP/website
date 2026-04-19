<script lang="ts">
  import type { Snippet } from "svelte";
  import Download from "$components/icons/Download.svelte";

  interface Props {
    icon: Snippet;
    href: string;
    size?: string;
  }

  let { icon, href, size }: Props = $props();

  const name = $derived(href.split("/").pop()!);

  let fetchedSize = $state<string | null>(null);

  $effect(() => {
    if (size) return;

    fetch(href, { method: "HEAD" })
      .then((res) => {
        const bytes = Number(res.headers.get("content-length"));
        if (!bytes) return;

        if (bytes < 1024) fetchedSize = `${bytes} B`;
        else if (bytes < 1024 * 1024)
          fetchedSize = `${(bytes / 1024).toFixed(1)} KB`;
        else fetchedSize = `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
      })
      .catch(() => null);
  });

  const displaySize = $derived(size ?? fetchedSize ?? "...");
</script>

<div class="download-card">
  <div class="download-card-icon">
    {#if icon}
      {@render icon()}
    {/if}
  </div>

  <div class="download-card-info">
    <div class="download-card-name">{name}</div>
    <div class="download-card-size">{displaySize ?? "..."}</div>
  </div>

  <a class="download-card-btn" {href} download={name} title="Download">
    <Download />
  </a>
</div>

<style>
  .download-card {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    background: var(--surface);
    border-radius: var(--radius-md);
    border: 1px dashed var(--border);
    padding: var(--space-4);
    margin-top: var(--space-3);
  }

  .download-card-info {
    flex: 1;
    min-width: 0;
  }

  .download-card-icon {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-md);
    background: var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .download-card-name {
    font-size: var(--text-sm);
    font-weight: 700;
  }

  .download-card-size {
    font-size: var(--text-xs);
    opacity: 0.6;
  }

  .download-card-btn {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-md);
    background: var(--accent);
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
  }
</style>
