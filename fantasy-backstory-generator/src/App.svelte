<script>
  import CharacterHooks from './lib/CharacterHooks.svelte';
  import OutputPane from './lib/OutputPane.svelte';
  import d20 from './assets/d20.jpg';
</script>

<main class="app-root">
  <header class="app-header">
    <img src={d20} alt="D20 Logo" class="d20-logo" />
    <h1 class="app-title">Fantasy Backstory Generator</h1>
  </header>

  <section class="app-grid">
    <aside class="left-panel">
      <CharacterHooks />
    </aside>

    <aside class="right-panel">
      <OutputPane />
    </aside>
  </section>

  <footer class="app-footer">generate, randomize, and export your character backstories</footer>
</main>

<style>
  :global(:root) {
    --bg: #0b1020;
  }

  .app-root {
    min-height: 100vh;
    padding: 28px;
    background: linear-gradient(180deg, var(--bg), #0f1724);
    color: var(--color-text-primary, #f3f4f6);
    font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
  }

  .app-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
  }

  .d20-logo {
    width: 56px;
    height: 56px;
    border-radius: 10px;
    box-shadow: 0 6px 18px rgba(0,0,0,0.6);
  }

  .app-title {
    margin: 0;
    font-size: 24px;
    font-weight: 600;
    color: var(--color-text-primary, #f3f4f6);
  }

  .app-grid {
    display: grid;
    grid-template-columns: 1fr 420px;
    gap: 20px;
    align-items: start;
  }

  .left-panel {
    display: block;
  }

  .right-panel {
    display: block;
  }

  .app-footer {
    margin-top: 20px;
    font-size: 13px;
    color: var(--color-text-secondary, #d1d5db);
    text-align: center;
    opacity: 0.9;
  }

  @media (max-width: 900px) {
    .app-grid {
      grid-template-columns: 1fr;
    }

    .d20-logo {
      width: 48px;
      height: 48px;
    }
  }
</style>
