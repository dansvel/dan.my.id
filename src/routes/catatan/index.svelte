<script>
	import { session, page } from '$app/stores';
	import { capitalize, slugger, urlParamsToQuery, getUrlParams } from '$lib/util';
	import CatatanList from '$lib/CatatanList.svelte';
	import SeoHead from '$lib/SeoHead.svelte';

	let allPosts = $session.posts;
	const allTags = $session.slugs;

	let posts, filter, navurl, more, hal;
	const per = 9;

	$: {
		filter = $page.query ? getUrlParams($page.query.toString()) : {};
		console.log(filter);
		if (filter.label) {
			allPosts = $session.posts.filter((post) =>
				post.tags.map((tag) => slugger(tag)).includes(filter.label)
			);
		}
		if (filter.kategori) {
			allPosts = $session.posts.filter((post) => slugger(post.category) === filter.kategori);
		}

		hal = parseInt(filter?.hal || 1);
		delete filter.hal;

		more = allPosts.length - hal * per <= 0;
		console.log(more)
		posts = allPosts.slice(hal * per - per, hal * per);

		navurl = '?' + urlParamsToQuery(filter) + (Object.keys(filter).length ? '&' : '') + 'hal=';
	}
</script>

<SeoHead
	title="Catatan perjalanan setengah manusia"
	description="Tentang teknologi yang kupelajari dan manusia yang kuteliti"
/>

<header>
	<h1>
		Catatan
		{#if JSON.stringify(filter) !== '{}'}
			tentang
			{filter.label ? $session.slugs.filter((slug) => slugger(slug) === filter.label) : ''}
			{filter.kategori ? capitalize(filter?.kategori) : ''}
		{/if}
	</h1>
	<div class="text-center">
		Kategori :
		<a href="/catatan?kategori=manusia">Manusia</a>
		<a href="/catatan?kategori=teknologi">Teknologi</a>
	</div>
	<div>
		<div class="text-center">
			Label :
			{#each allTags as tag}
				<a href="/catatan?label={slugger(tag)}">#{tag}</a>
				<span class="last:hidden">&nbsp;</span>
			{/each}
		</div>
	</div>
</header>

<CatatanList {posts} />

<div class="flex">
	<a href={navurl + (hal - 1)} class:hidden={hal <= 1}>Lebih baru</a>
	<a href={navurl + (hal + 1)} class="ml-auto" class:hidden={more}>Lebih lawas</a>
</div>

<style lang="postcss">
	header {
		@apply py-4 border-b-2 border-gray-500;
		h1 {
			@apply my-2 text-center;
		}
	}
</style>
