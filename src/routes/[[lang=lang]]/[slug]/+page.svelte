<script>
	import Content from '$lib/component/Content.svelte'

	/** @type {import('$lib/server/content/index.js').getPost} */
	export let data
</script>

<Content {...data} />
