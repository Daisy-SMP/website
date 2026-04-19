<script>
  import PartyPopper from "$components/icons/PartyPopper.svelte";
</script>

<div class="done-banner">
  <div class="done-icon"><PartyPopper width="3.5em" height="3.5em" /></div>
  <div>
    <h3>You're all set!</h3>
    <p>
      Your instance is configured with unsup and will auto-update the modpack
      every time you launch. Hit Play and join the server!
    </p>
  </div>
</div>

<style>
  .done-banner {
    background: var(--accent);
    color: #fff;
    border-radius: var(--radius-lg);
    padding: var(--space-5);
    display: flex;
    align-items: center;
    gap: var(--space-4);
    margin-bottom: var(--space-6);
    box-shadow: var(--shadow-md);
  }

  .done-banner h3 {
    font-size: var(--text-md);
    font-weight: 700;
    margin-bottom: var(--space-1);
  }

  .done-banner p {
    font-size: var(--text-sm);
    opacity: 0.9;
  }
</style>
