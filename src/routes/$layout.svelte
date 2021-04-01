<script>
  import '../global.postcss'
  import Nav from '../lib/components/Nav.svelte'

  import { onMount } from 'svelte'
  import { theme } from '../store'

  onMount(() => {
    if ($theme === 'dark') {
      document.querySelector('html').classList.add('dark')
      document.querySelector('link[title=Dark]').toggleAttribute('disabled')
    } else {
      document.querySelector('link[title=Light]').toggleAttribute('disabled')
    }
  })
</script>

<Nav />

<slot />

<svelte:head>
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500;600;700;800;900&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700;800;900&display=swap"
    rel="stylesheet"
  />
  <link rel="stylesheet" title="Dark" href="/dist/atom-one-dark.css" disabled />
  <link rel="stylesheet" title="Light" href="/dist/atom-one-light.css" disabled />
  <link rel="webmention" href="https://webmention.io/dan.my.id/webmention" />
  <link rel="pingback" href="https://webmention.io/dan.my.id/xmlrpc" />
  <link href="https://github.com/dansvel" rel="me" />
  <link href="https://twitter.com/dansvel" rel="me" />
</svelte:head>
