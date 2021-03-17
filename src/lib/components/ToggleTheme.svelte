<script>
  import { theme } from '../../routes/store';

  const toggleTheme = (e) => {
    e.currentTarget.blur();
    $theme = $theme === 'dark' ? 'light' : 'dark';

    document.querySelector('html').classList.toggle('dark');
    document.querySelector('link[title=Dark]').toggleAttribute('disabled');
    document.querySelector('link[title=Light]').toggleAttribute('disabled');
  };
</script>

<button
        on:click={toggleTheme}
        class="py-2 px-2 focus:outline-none hover:bg-gray-500 rounded-full">
  {#if $theme === 'dark'}🌙{:else}☀{/if}
</button>
