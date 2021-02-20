<script lang="ts">
  import Nav from '../components/Nav.svelte';
  import { onMount } from 'svelte';
  import { theme } from './store';

  onMount(() => {
    if ($theme === 'dark') {
      document.querySelector('html').classList.add('dark');
      document.querySelector('link[title=Dark]').toggleAttribute('disabled');
    } else {
      document.querySelector('link[title=Light]').toggleAttribute('disabled');
    }
  });
</script>

<Nav />

<main>
  <slot />
</main>

<svelte:head>
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;500;600;700;800;900" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500;600;700;800;900" rel="stylesheet">
  <link rel="stylesheet" title="Dark" href="/dist/a11y-dark.css" disabled />
  <link rel="stylesheet" title="Light" href="/dist/a11y-light.css" disabled />
  <link rel="webmention" href="https://webmention.io/dan.my.id/webmention" />
  <link rel="pingback" href="https://webmention.io/dan.my.id/xmlrpc" />
</svelte:head>

<style lang="postcss" global>
  @import "_global.pcss";
</style>