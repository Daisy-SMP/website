<script lang="ts">
  interface Props {
    title: string;
    text: string;
  }

  let { title, text }: Props = $props();

  let copied = $state(false);

  function copyArg() {
    navigator.clipboard.writeText(text).then(() => {
      copied = true;
      setTimeout(() => (copied = false), 1500);
    });
  }
</script>

<div class="code-block">
  <div class="code-block-header">
    <span>{title}</span>
    <button class="copy-btn" onclick={copyArg}>
      {copied ? "Copied!" : "Copy"}
    </button>
  </div>
  <pre>{text}</pre>
</div>

<style>
  .code-block {
    margin-top: 12px;
    background: rgba(0, 0, 0, 0.08);
    border-radius: 10px;
    overflow: hidden;
    font-family: "Space Mono", monospace;
    font-size: 12px;
  }

  :global([data-theme="dark"]) .code-block {
    background: rgba(255, 255, 255, 0.06);
  }

  .code-block-header {
    padding: 8px 14px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    background: rgba(0, 0, 0, 0.06);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  :global([data-theme="dark"]) .code-block-header {
    background: rgba(255, 255, 255, 0.04);
  }

  .copy-btn {
    background: var(--primary);
    border: none;
    padding: 3px 10px;
    border-radius: 5px;
    font-size: 11px;
    font-weight: 700;
    cursor: pointer;
    color: #000;
    transition: opacity 0.2s;
  }

  .copy-btn:hover {
    opacity: 0.8;
  }

  .code-block pre {
    padding: 14px 16px;
    white-space: pre-wrap;
    word-break: break-all;
    line-height: 1.6;
    overflow-x: auto;
  }
</style>
