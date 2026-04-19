<script>
  import PartyPopper from "$components/icons/PartyPopper.svelte";

</script>

<div class="done-banner">
  <div class="done-icon"><PartyPopper /></div>
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
    border-radius: 16px;
    padding: 28px;
    display: flex;
    align-items: center;
    gap: 18px;
    margin-bottom: 40px;
  }

  .done-banner .done-icon {
    font-size: 36px;
    line-height: 1;
  }

  .done-banner h3 {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 4px;
  }

  .done-banner p {
    font-size: 14px;
    opacity: 0.9;
  }
</style>
