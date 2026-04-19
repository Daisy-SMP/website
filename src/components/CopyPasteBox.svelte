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
    margin-top: var(--space-3);
    background: var(--surface);
    border-radius: var(--radius-md);
    overflow: hidden;
    font-family: "Space Mono", monospace;
    font-size: var(--text-xs);
    border: 1px solid var(--border);
  }

  .code-block-header {
    padding: var(--space-2) var(--space-4);
    font-size: var(--text-xs);
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    background: var(--bg);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .copy-btn {
    background: var(--primary);
    border: none;
    padding: 3px 10px;
    border-radius: var(--radius-sm);
    font-size: var(--text-xs);
    font-weight: 700;
    cursor: pointer;
    color: #000;
  }

  .code-block pre {
    padding: var(--space-4);
    line-height: 1.6;
    overflow-x: auto;
  }
</style>
