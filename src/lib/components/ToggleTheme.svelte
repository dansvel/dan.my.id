<script>
  import { theme } from '../../store'

  const toggleTheme = () => {
    $theme = $theme === 'dark' ? 'light' : 'dark'

    document.querySelector('html').classList.toggle('dark')
    document.querySelector('link[title=Dark]').toggleAttribute('disabled')
    document.querySelector('link[title=Light]').toggleAttribute('disabled')
  }
</script>

<button on:click={toggleTheme}>
  {#if $theme === 'dark'}🌙{:else}☀️{/if}
</button>

<style lang="postcss">
  button {
    @apply py-2 px-2 rounded-full;
    &:hover,
    &:focus {
      @apply bg-transparent;
      box-shadow: 0 0 0 2px rgba(4, 120, 87, 1);
      :global(.dark) & {
        box-shadow: 0 0 0 2px rgba(110, 231, 183, 1);
      }
    }
    &:focus {
      @apply outline-none;
    }
  }
</style>
