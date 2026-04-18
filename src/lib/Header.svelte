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
