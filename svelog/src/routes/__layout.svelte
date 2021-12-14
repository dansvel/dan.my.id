<script>
  import 'virtual:windi.css'
  import './app.postcss'
  import Nav from '$lib/Nav.svelte'
  // import { onMount } from 'svelte'

  // onMount(async () => {
  //   if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  //     document.querySelector('link[title=Dark]').removeAttribute('disabled')
  //   } else {
  //     document.querySelector('link[title=Light]').removeAttribute('disabled')
  //   }
  // })
</script>

<Nav />
<main>
  <slot />
</main>
