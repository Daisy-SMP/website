<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    num: number;
    title: string;
    children: Snippet;
  }

  let { num, title, children }: Props = $props();
</script>

<div class="step">
  <div class="step-num">{num}</div>
  <div class="step-body">
    <h4>{title}</h4>
    {@render children()}
  </div>
</div>