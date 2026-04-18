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