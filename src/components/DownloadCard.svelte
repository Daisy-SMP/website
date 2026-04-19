<script lang="ts">
  import type { Snippet } from "svelte";
  import Download from "./icons/Download.svelte";

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
    gap: 14px;
    background: var(--dark-bg);
    border-radius: 12px;
    border: 2px dashed rgba(0, 0, 0, 0.15);
    padding: 14px 16px;
    margin-top: 14px;
  }

  :global([data-theme="dark"]) .download-card {
    border-color: rgba(255, 255, 255, 0.12);
  }

  .download-card-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .download-card-info {
    flex: 1;
    min-width: 0;
  }

  .download-card-name {
    font-size: 14px;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .download-card-size {
    font-size: 12px;
    opacity: 0.5;
    margin-top: 2px;
  }

  .download-card-btn {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: var(--accent);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    text-decoration: none;
    transition:
      opacity 0.2s,
      transform 0.1s;
  }

  .download-card-btn:hover {
    opacity: 0.85;
    transform: translateY(-1px);
  }
</style>
