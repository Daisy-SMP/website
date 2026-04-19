<script lang="ts">
  interface Props {
    src: string;
    alt: string;
  }

  let { src, alt }: Props = $props();
</script>

<div class="screenshot">
  <img {src} {alt} />
</div>

<style>
  .screenshot {
    margin-top: 14px;
    border-radius: 12px;
    overflow: hidden;
    border: 2px dashed rgba(0, 0, 0, 0.15);
  }

  :global([data-theme="dark"]) .screenshot {
    border-color: rgba(255, 255, 255, 0.12);
  }

  .screenshot img {
    width: 100%;
    display: block;
  }
</style>
