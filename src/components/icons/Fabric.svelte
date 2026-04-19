<script lang="ts">
  interface Props {
    width?: number | string;
    height?: number | string;
  }

  let { width = "1em", height = "1em" }: Props = $props();
</script>

<img src="/img/fabric.webp" alt="Fabric loader's logo" />

<style>
  img {
    width: 1em;
    height: 1em;
    vertical-align: middle;
  }
</style>
