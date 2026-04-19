<script lang="ts">
  import type { Snippet } from "svelte";
  import { getStepCounter } from "$lib/stepContext";

  interface Props {
    title: string;
    children: Snippet;
    reset?: boolean;
  }

  let { title, children, reset = false }: Props = $props();

  const counter = getStepCounter();

  let num = $state(0);

  $effect.pre(() => {
    if (reset) counter.reset();
    num = counter.next();
  });
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
    gap: var(--space-5);
  }

  .step-num {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--primary);
    color: #000;
    font-weight: 700;
    font-size: var(--text-sm);
    display: flex;
    align-items: center;
    justify-content: center;
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
