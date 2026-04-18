<script lang="ts">
  import { onMount } from "svelte";
  import MethodCard from "$lib/MethodCard.svelte";

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
    A cozy survival multiplayer SMP with voice chat, Origins, and on the latest
    version.
  </p>

  <div class="method-picker">
    <MethodCard
      badge="Join"
      badgeType="easy"
      title="Join the Server"
      description="Join the discord server and send an application to play."
      href="https://daisydc.macuguita.com"
      external
    />
    <MethodCard
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
        <div class="section-icon icon-modrinth">🧩</div>
        <div class="section-header-text">
          <span class="badge badge-advanced">Mods</span>
          <h2>Core Modpack Mods</h2>
        </div>
      </div>

      <div class="method-picker">
        <MethodCard
          badge="Social"
          badgeType="easy"
          title="Simple Voice Chat"
          description="Proximity voice chat so you can talk to nearby players in-game."
          href="https://modrinth.com/mod/simple-voice-chat"
          external
        />
        <MethodCard
          badge="Gameplay"
          badgeType="advanced"
          title="Origins"
          description="Choose unique abilities and playstyles that change Minecraft completely."
          href="https://modrinth.com/mod/origins-legacy"
          external
        />
        <MethodCard
          badge="Utility"
          badgeType="easy"
          title="Unsup"
          description="Auto-updates the modpack every time you launch the game."
          href="https://modrinth.com/mod/unsup"
          external
        />
        <MethodCard
          badge="Core"
          badgeType="advanced"
          title="Latest Minecraft version"
          description="We play on the latest version with access to all the new features."
          href="https://minecraft.net"
          external
        />
      </div>
    </div>
  </div>
</div>
