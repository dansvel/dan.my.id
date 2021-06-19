<script>
  import { theme } from '../routes/store'
  const toggleTheme = () => {
    $theme = $theme === 'dark' ? 'light' : 'dark'
    document.querySelector('html').classList.toggle('dark')
    document.querySelector('link[title=Dark]').toggleAttribute('disabled')
    document.querySelector('link[title=Light]').toggleAttribute('disabled')
  }
</script>

<button on:click={toggleTheme} class="ml-2 focus:outline-none">
  {#if $theme === 'dark'}
    🌙
  {:else}
    ☀️
  {/if}
</button>
