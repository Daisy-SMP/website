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

<style>
  .step {
    display: flex;
    gap: 20px;
    align-items: flex-start;
  }

  .step-num {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--primary);
    color: #000;
    font-weight: 700;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .step-body {
    flex: 1;
  }

  .step-body h4 {
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 6px;
  }
</style>