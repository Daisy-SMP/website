<script lang="ts">
  import { onMount } from "svelte";

  let isDark = $state(false);
  let visible = $state(true);
  let lastY = $state(0);
  let menuOpen = $state(false);

  function toggleTheme() {
    isDark = !isDark;
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  function toggleMenu() {
    menuOpen = !menuOpen;
  }

  function closeMenu() {
    menuOpen = false;
  }

  onMount(() => {
    const saved = localStorage.getItem("theme");
    isDark = saved
      ? saved === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "");

    function onScroll() {
      const y = window.scrollY;
      visible = y < 64 ? true : y < lastY;
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

  <!-- Desktop nav -->
  <nav class="nav-desktop">
    <a href="/">Home</a>
    <a href="/modpack">Modpack Guide</a>
    <a href="/origins">Origins</a>

    <button
      class="theme-toggle mobile-theme"
      onclick={toggleTheme}
      title="Toggle theme"
    >
      <img
        src={isDark ? "/img/sun.svg" : "/img/moon.svg"}
        alt="Toggle theme"
        width="18"
        height="18"
      />
    </button>
  </nav>

  <!-- Mobile burger -->
  <button class="burger" onclick={toggleMenu} aria-label="Menu"> ☰ </button>

  <!-- Mobile drawer -->
  <button
    class="mobile-overlay"
    class:open={menuOpen}
    onclick={closeMenu}
    aria-label="Close menu"
  >
  </button>

  <aside class="mobile-menu" class:open={menuOpen}>
    <a href="/" onclick={closeMenu}>Home</a>
    <a href="/modpack" onclick={closeMenu}>Modpack Guide</a>
    <a href="/origins" onclick={closeMenu}>Origins</a>

    <button
      class="theme-toggle mobile-theme"
      onclick={toggleTheme}
      title="Toggle theme"
    >
      <img
        src={isDark ? "/img/sun.svg" : "/img/moon.svg"}
        alt="Toggle theme"
        width="18"
        height="18"
      />
    </button>
  </aside>
</header>

<style>
  header {
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 40px;
    background: var(--surface);
    min-height: 64px;
    transition: transform 0.3s ease;
    z-index: 100;
  }

  header.hidden {
    transform: translateY(-100%);
  }

  /* Logo */
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
  }

  .logo h1 {
    font-size: 20px;
    font-weight: 700;
  }

  /* Desktop nav */
  .nav-desktop {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .nav-desktop a {
    color: var(--text);
    text-decoration: none;
    font-weight: 500;
    transition: opacity 0.2s;
  }

  .nav-desktop a:hover {
    opacity: 0.7;
  }

  /* Theme button */
  .theme-toggle {
    cursor: pointer;
    width: 36px;
    height: 36px;
    border-radius: 8px;
    background: var(--primary);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Burger (hidden on desktop) */
  .burger {
    display: none;
    font-size: 26px;
    background: none;
    border: none;
    color: var(--text);
    cursor: pointer;
  }

  /* Mobile overlay */
  .mobile-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    border: none;
    padding: 0;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s;
    z-index: 150;
  }

  .mobile-overlay.open {
    opacity: 1;
    pointer-events: auto;
  }

  /* Mobile menu */
  .mobile-menu {
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    width: 260px;
    background: var(--surface);
    transform: translateX(100%);
    transition: transform 0.25s ease;
    display: flex;
    flex-direction: column;
    padding: 24px;
    gap: 16px;
    z-index: 200;
  }

  .mobile-menu.open {
    transform: translateX(0);
  }

  .mobile-menu a {
    color: var(--text);
    text-decoration: none;
    font-size: 16px;
    font-weight: 600;
  }

  .mobile-theme {
    margin-top: auto;
  }

  /* Responsive rules */
  @media (max-width: 600px) {
    header {
      padding: 16px 20px;
    }

    .nav-desktop {
      display: none;
    }

    .burger {
      display: block;
    }
  }
</style>
