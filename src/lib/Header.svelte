<script lang="ts">
  import { onMount } from "svelte";

  let isDark = $state(false);

  function toggleTheme() {
    isDark = !isDark;
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  onMount(() => {
    isDark = localStorage.getItem("theme") === "dark";
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "");
  });
</script>

<header>
  <a href="/" class="logo">
    <img src="/img/logo.webp" alt="Daisy SMP Logo" />
    <h1>Daisy SMP</h1>
  </a>
  <nav>
    <a href="/">Home</a>
    <a href="/modpack">Modpack Guide</a>
    <button class="theme-toggle" onclick={toggleTheme} title="Toggle theme">
      <img
        src={isDark ? "/img/sun.svg" : "/img/moon.svg"}
        alt="Toggle theme"
        width="18"
        height="18"
      />
    </button>
  </nav>
</header>

<style>
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 40px;
    background: rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(10px);
    min-height: 64px;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    color: var(--text);
  }

  .logo img {
    width: 48px;
    height: 48px;
    image-rendering: pixelated;
    object-fit: contain;
    margin-top: -4px;
    margin-bottom: -4px;
  }

  .logo h1 {
    font-size: 20px;
    font-weight: 700;
  }

  nav {
    display: flex;
    align-items: center;
  }

  nav a {
    color: var(--text);
    text-decoration: none;
    margin-left: 20px;
    font-weight: 500;
    transition: opacity 0.2s;
  }

  nav a:hover {
    opacity: 0.7;
  }

  .theme-toggle {
    margin-left: 20px;
    cursor: pointer;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background: var(--primary);
    border: none;
  }

  @media (max-width: 600px) {
    header {
      padding: 16px 20px;
    }
  }
</style>