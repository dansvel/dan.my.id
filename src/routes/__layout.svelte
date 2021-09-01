<script>
  import 'virtual:windi.css'
  import './app.postcss'
	import Nav from '$lib/Nav.svelte';
	import { onMount } from 'svelte';

  onMount(() => {
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.querySelector('link[title=Dark]').toggleAttribute('disabled')
    } else {
      document.querySelector('link[title=Light]').toggleAttribute('disabled')
		}
	})

</script>

<Nav/>
<main>
	<slot></slot>
</main>
