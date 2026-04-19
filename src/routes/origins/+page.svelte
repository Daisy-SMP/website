<script lang="ts">
  import CardWithOrigin from "$components/CardWithOrigin.svelte";

  let { data } = $props();
</script>

<svelte:head>
  <title>DaisySMP — Origins</title>
</svelte:head>

<div class="page-content">
  <h1 class="page-title">Origins</h1>
  <p class="page-subtitle">The origins available on Daisy SMP.</p>

  <div class="origins-grid">
    {#each data.origins as origin}
      <CardWithOrigin {origin} />
    {/each}
  </div>
</div>

<style>
  .origins-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  @media (max-width: 600px) {
    .origins-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
