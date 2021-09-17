<script>
	import { session } from '$app/stores';
	import content from '$contents/page/index.md';
	import CatatanList from '$lib/CatatanList.svelte';
	import SeoHead from '$lib/SeoHead.svelte';

	const posts = $session.posts.slice(0, 9);
</script>

<SeoHead />

<header>
	<h1>{content.title}</h1>
	<h2>{content.subtitle}</h2>
	{@html content.body}
</header>

<CatatanList {posts} title="Catatan terbaru" />
<a href="/catatan?pageNum=2">Lebih banyak catatan</a>

<style lang="postcss">
	header {
		@apply py-4;

		h1,
		h2 {
			@apply my-2 text-center leading-normal;
		}
	}
	a {
		@apply float-right;
	}
</style>
