<script>
  import 'virtual:windi.css'
  import Nav from '$lib/Nav.svelte'
  import { theme } from './store'
  import { onMount } from 'svelte'

  onMount(() => {
    if ($theme === 'dark') {
      document.querySelector('link[title=Dark]').toggleAttribute('disabled')
    } else {
      document.querySelector('link[title=Light]').toggleAttribute('disabled')
    }
  })
</script>

<svelte:head>
  <script>
    try {
      let preference = false
      if (localStorage.getItem('theme')) {
        preference = localStorage.getItem('theme') === 'dark'
      } else {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          preference = true
          localStorage.setItem('theme', 'dark')
        } else {
          localStorage.setItem('theme', 'light')
        }
      }
      if (preference) document.querySelector('html').classList.add('dark')
    } catch (e) {}
  </script>
  <link rel="stylesheet" title="Dark" href="/dist/stackoverflow-dark.css" disabled />
  <link rel="stylesheet" title="Light" href="/dist/stackoverflow-light.css" disabled />
</svelte:head>

<Nav />
<slot />

<style global lang="postcss">
  @import 'app.postcss';

  .dark code {
    background-color: red;
  }

  body > #svelte > main {
    @apply p-12 mt-0 max-w-4xl mx-auto;
  }
</style>
