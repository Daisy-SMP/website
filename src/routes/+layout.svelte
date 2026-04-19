<script lang="ts">
  import { initStepCounter } from '$lib/stepContext';
  import "../app.css";
  import Header from "$components/Header.svelte";
  import Footer from "$components/Footer.svelte";

  initStepCounter();

  let { children } = $props();
</script>

<Header />
{@render children()}
<Footer />
