<script lang="ts">
  import './_global.pcss';
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
  <!--{#if $theme === 'dark'}-->
  <link rel="stylesheet" title="Dark" href="/dist/a11y-dark.css" disabled />
  <!--{:else}-->
  <link rel="stylesheet" title="Light" href="/dist/a11y-light.css" disabled />
  <!--{/if}-->
</svelte:head>
