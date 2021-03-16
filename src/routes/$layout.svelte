<script lang="ts">
  import './_global.pcss';
  import Nav from '$components/Nav.svelte';
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

<!--<main>-->
<slot />
<!--</main>-->

<svelte:head>
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500;600;700;800;900" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700;800;900" rel="stylesheet" />
  <link rel="stylesheet" title="Dark" href="/dist/a11y-dark.css" disabled />
  <link rel="stylesheet" title="Light" href="/dist/a11y-light.css" disabled />
  <link rel="webmention" href="https://webmention.io/dan.my.id/webmention" />
  <link rel="pingback" href="https://webmention.io/dan.my.id/xmlrpc" />
  <link href="https://github.com/dansvel" rel="me" />
  <link href="https://twitter.com/dansvel" rel="me" />
</svelte:head>
