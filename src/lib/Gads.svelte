<script>
	import { onMount } from 'svelte';

	export let content
	let num = 0

	onMount(()=> count())

	const count = () => {
		num++
		setTimeout(count, 1000)
	}
</script>

<svelte:head>
	<script
		data-ad-client="ca-pub-9203783485756583"
		async
		src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
</svelte:head>

<h3>{num}</h3>
<h3>{content}</h3>
