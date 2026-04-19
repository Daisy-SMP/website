<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
    href?: string;
    external?: boolean;
  }

  let { children, href, external = false }: Props = $props();
</script>

{#if href}
  <a
    class="card"
    {href}
    target={external ? "_blank" : undefined}
    rel={external ? "noreferrer noopener" : undefined}
  >
    {@render children()}
  </a>
{:else}
  <div class="card">
    {@render children()}
  </div>
{/if}

<style>
  .card {
    border-radius: var(--radius-lg);
    padding: var(--space-5);
    background: var(--surface);
    color: var(--text);
    display: block;
    border: 2px solid var(--border);

    transition:
      transform var(--speed-normal) var(--ease),
      box-shadow var(--speed-normal) var(--ease),
      border-color var(--speed-normal) var(--ease);

    position: relative;
    overflow: hidden;

    box-shadow: var(--shadow-sm);
  }

  .card:hover {
    transform: translateY(-4px);
    border-color: var(--primary);
    box-shadow: var(--shadow-md);
  }
</style>
