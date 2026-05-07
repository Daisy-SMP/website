<script lang="ts">
  interface Props {
    width?: number | string;
    height?: number | string;
  }

  let { width = "1em", height = "1em" }: Props = $props();
</script>

<img
  src="/img/neoforge.webp"
  alt="Neoforge loader's logo"
  style:width={typeof width === "number" ? `${width}px` : width}
  style:height={typeof height === "number" ? `${height}px` : height}
/>

<style>
  img {
    vertical-align: middle;
  }
</style>
