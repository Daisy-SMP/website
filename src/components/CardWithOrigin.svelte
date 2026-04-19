<script lang="ts">
  import type { Origin } from "$lib/types";
  import Card from "$components/Card.svelte";

  interface Props {
    origin: Origin;
  }

  let { origin }: Props = $props();

  interface IconOverride {
    item: string;
    link: string;
    icon: string;
  }

  const iconOverrides: IconOverride[] = [
    {
      item: "minecraft:cod",
      link: "https://minecraft.wiki/w/Raw_Cod",
      icon: "https://minecraft.wiki/images/Invicon_Raw_Cod.png",
    },
  ];

  function getIconUrl(icon: string): string {
    const override = iconOverrides.find((o) => o.item === icon);
    if (override) return override.icon;

    const [ns, id] = icon.split(":");

    if (!id) return "https://minecraft.wiki/images/Missing_Texture_JE4.png";

    if (ns === "minecraft") {
      const name = id
        .split("_")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join("_");

      return `https://minecraft.wiki/images/Invicon_${name}.png`;
    }

    return `/data/${ns}/icons/${id}.png`;
  }
</script>

<Card>
  <div class="origin-header">
    <div class="origin-title">
      <div class="origin-title-left">
        <img
          class="origin-icon"
          src={getIconUrl(origin.icon)}
          alt={origin.name}
          width={32}
          height={32}
          onerror={(e) =>
            ((e.currentTarget as HTMLImageElement).src =
              "https://minecraft.wiki/images/Missing_Texture_JE4.png")}
        />
        <h2>{origin.name}</h2>
      </div>

      <span class="impact">
        <span class="impact-inner">
          {"◆".repeat(origin.impact)}{"◇".repeat(3 - origin.impact)}
        </span>
      </span>
    </div>

    <p class="origin-description">{origin.description}</p>
  </div>

  {#if origin.powers.length > 0}
    <div class="powers">
      {#each origin.powers as power}
        <div class="power">
          <span class="power-name">{power.name}</span>

          {#if power.description}
            <span class="power-description">{power.description}</span>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</Card>

<style>
  .origin-header {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .origin-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .origin-title-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .origin-icon {
    image-rendering: pixelated;
    flex-shrink: 0;
  }

  h2 {
    font-size: 18px;
    font-weight: 700;
  }

  .impact {
    font-size: 12px;
    color: var(--primary);
    letter-spacing: 2px;
    flex-shrink: 0;
  }

  .impact-inner {
    font-family:
      ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
      monospace;
    letter-spacing: 2px;
  }

  .origin-description {
    font-size: 13px;
    opacity: 0.7;
    line-height: 1.6;
  }

  .powers {
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    padding-top: 22px;
    margin-top: 10px;
  }

  :global([data-theme="dark"]) .powers {
    border-top-color: rgba(255, 255, 255, 0.1);
  }

  .power {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .power-name {
    font-size: 13px;
    font-weight: 700;
  }

  .power-description {
    font-size: 12px;
    opacity: 0.6;
    line-height: 1.5;
  }
</style>
