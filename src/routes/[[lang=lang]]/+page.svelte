<script>
	import * as m from '$paraglide/messages'
	import PostList from '$lib/component/PostList.svelte'

	/** @type {import('./$types').PageData} */
	export let data
</script>

<div class="typography">
	<h1>Dan</h1>
	<h2>{@html m.deskripsiBlog()}</h2>
</div>

<PostList posts={data.posts} lang={data.lang} />
