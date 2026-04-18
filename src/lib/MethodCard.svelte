<script lang="ts">
  interface Props {
    badge: string;
    badgeType?: 'easy' | 'advanced';
    title: string;
    description: string;
    href: string;
    external?: boolean;
  }

  let { badge, badgeType = 'easy', title, description, href, external = false }: Props = $props();
</script>

<a class="method-card" {href} target={external ? '_blank' : undefined}>
  <div class="badge badge-{badgeType}">{badge}</div>
  <h3>{title}</h3>
  <p>{description}</p>
  <span class="arrow">→</span>
</a>

<style>
  .method-card {
    background: var(--card);
    border-radius: 16px;
    padding: 28px 24px;
    text-decoration: none;
    color: var(--text);
    display: block;
    border: 2px solid transparent;
    transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
    position: relative;
    overflow: hidden;
  }

  .method-card:hover {
    transform: translateY(-4px);
    border-color: var(--primary);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
  }

  .badge {
    display: inline-block;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 3px 8px;
    border-radius: 6px;
    margin-bottom: 14px;
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
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    opacity: 0.7;
    line-height: 1.6;
  }

  .arrow {
    position: absolute;
    bottom: 20px;
    right: 22px;
    font-size: 20px;
    opacity: 0.4;
    transition: opacity 0.2s, transform 0.2s;
  }

  .method-card:hover .arrow {
    opacity: 1;
    transform: translateX(4px);
  }
</style>