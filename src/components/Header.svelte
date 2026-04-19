<script lang="ts">
  import { onMount } from "svelte";

  let isDark = $state(false);
  let visible = $state(true);
  let lastY = $state(0);

  function toggleTheme() {
    isDark = !isDark;
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  onMount(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      isDark = saved === "dark";
    } else {
      isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "");

    function onScroll() {
      const y = window.scrollY;
      if (y < 64) {
        visible = true;
      } else {
        visible = y < lastY;
      }
      lastY = y;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  });
</script>

<header class:hidden={!visible}>
  <a href="/" class="logo">
    <img src="/img/logo.webp" alt="Daisy SMP Logo" />
    <h1>Daisy SMP</h1>
  </a>
  <nav>
    <a href="/">Home</a>
    <a href="/modpack">Modpack Guide</a>
    <a href="/origins">Origins</a>
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
    position: sticky;
    display: flex;
    align-items: center;
    justify-content: space-between;
    top: 0;
    padding: 16px 40px;
    z-index: 100;
    background: var(--dark-bg);
    min-height: 64px;
    transition: transform 0.3s ease;
  }

  header.hidden {
    transform: translateY(-100%);
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
    min-width: 36px;
    min-height: 36px;
    flex-shrink: 0;
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
