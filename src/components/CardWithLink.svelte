<script lang="ts">
  import Star from "$components/icons/Star.svelte";
  import RightArrow from "./icons/RightArrow.svelte";

  interface Props {
    badge: string;
    badgeType?: "easy" | "advanced";
    title: string;
    description: string;
    href: string;
    external?: boolean;
    star?: boolean;
  }

  let {
    badge,
    badgeType = "easy",
    title,
    description,
    href,
    external = false,
    star = false,
  }: Props = $props();
</script>

<a class="method-card" {href} target={external ? "_blank" : undefined}>
  <div class="badge badge-{badgeType}">
    {#if star}
      <Star />
    {/if}
    {badge}
  </div>
  <h3>{title}</h3>
  <p>{description}</p>
  <span class="arrow"><RightArrow /></span>
</a>

<style>
  .method-card {
    border-radius: var(--radius-lg);
    padding: 28px 24px;
    text-decoration: none;
    color: var(--text);
    background: var(--surface);
    display: block;
    position: relative;
    overflow: hidden;
    border: 2px solid var(--border);
    transition:
      transform var(--speed-normal) var(--ease),
      box-shadow var(--speed-normal) var(--ease),
      border-color var(--speed-normal) var(--ease);
  }

  .method-card:hover {
    transform: translateY(-6px);
    border-color: var(--primary);
    box-shadow: var(--shadow-md);
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    font-size: var(--text-xs);
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 3px 8px;
    border-radius: var(--radius-sm);
    margin-bottom: var(--space-3);
  }

  .badge-easy {
    background: var(--accent);
    color: #fff;
  }

  .badge-advanced {
    background: var(--primary);
    color: #000;
  }

  h3 {
    font-size: var(--text-lg);
    font-weight: 700;
  }

  p {
    font-size: var(--text-sm);
    line-height: 1.6;
    opacity: 0.75;
  }

  .arrow {
    position: absolute;
    bottom: var(--space-4);
    right: var(--space-4);
    opacity: 0.4;
    transition:
      opacity var(--speed-normal),
      transform var(--speed-normal);
  }

  .method-card:hover .arrow {
    opacity: 1;
    transform: translateX(4px);
  }
</style>
