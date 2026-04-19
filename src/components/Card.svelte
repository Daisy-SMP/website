<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
    href?: string | undefined;
    external?: boolean;
  }

  let {
    children,
    href = undefined,
    external = false
  }: Props = $props();
</script>

{#if href}
  <a
    class="card"
    href={href}
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
    border-radius: 16px;
    padding: 28px 24px;
    text-decoration: none;
    color: var(--text);
    background: var(--dark-bg);
    display: block;
    border: 2px solid transparent;
    transition:
      transform 0.2s,
      border-color 0.2s,
      box-shadow 0.2s;
    position: relative;
    overflow: hidden;
  }

  .card:hover {
    transform: translateY(-4px);
    border-color: var(--primary);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
  }
</style>