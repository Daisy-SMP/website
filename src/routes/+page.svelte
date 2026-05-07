<script lang="ts">
  import { onMount } from "svelte";
  import CardWithLink from "$components/CardWithLink.svelte";
  import PuzzlePiece from "$components/icons/PuzzlePiece.svelte";

  onMount(() => {
    document
      .querySelectorAll<HTMLAnchorElement>('a[href^="#"]')
      .forEach((a) => {
        a.addEventListener("click", (e) => {
          const target = document.querySelector(a.getAttribute("href")!);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
          }
        });
      });
  });
</script>

<svelte:head>
  <title>Daisy SMP</title>
</svelte:head>

<div class="page-content">
  <h1 class="page-title">Welcome to Daisy SMP</h1>
  <p class="page-subtitle">
    A cozy survival multiplayer SMP with voice chat, Create, and Create
    Aeronautics.
  </p>

  <div class="method-picker">
    <CardWithLink
      badge="Join"
      badgeType="easy"
      title="Join the Server"
      description="Join the discord server and send an application to play."
      href="https://daisydc.macuguita.com"
      external
    />
    <CardWithLink
      badge="Guide"
      badgeType="advanced"
      title="Modpack Setup"
      description="Install everything you need with a step-by-step guide."
      href="/modpack"
    />
  </div>

  <div class="section" id="features">
    <div class="section" id="mods">
      <div class="section-header">
        <div class="section-icon icon-modrinth">
          <PuzzlePiece width="1.5em" height="1.5em" />
        </div>
        <div class="section-header-text">
          <span class="badge badge-advanced">Mods</span>
          <h2>Core Modpack Mods</h2>
        </div>
      </div>

      <div class="method-picker">
        <CardWithLink
          badge="Social"
          badgeType="easy"
          title="Simple Voice Chat"
          description="Proximity voice chat so you can talk to nearby players in-game."
          href="https://modrinth.com/mod/simple-voice-chat"
          external
        />
        <CardWithLink
          badge="Gameplay"
          badgeType="advanced"
          title="Create"
          description="Make unique contraptions to aid you while playing the server."
          href="https://modrinth.com/mod/create"
          external
        />
        <CardWithLink
          badge="Utility"
          badgeType="easy"
          title="Unsup"
          description="Auto-updates the modpack every time you launch the game."
          href="https://modrinth.com/mod/unsup"
          external
        />
        <CardWithLink
          badge="Gameplay"
          badgeType="advanced"
          title="Create Aeronautics"
          description="Make contraptions that will make your exploration journey easier."
          href="https://modrinth.com/mod/create-aeronautics"
          external
        />
      </div>
    </div>
  </div>
</div>
