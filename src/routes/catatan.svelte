<script>
	import { session, page } from '$app/stores';
	import { capitalize, slugger, urlParamsToQuery, getUrlParams } from '$lib/util';
	import CatatanList from '$lib/CatatanList.svelte';
	import { get } from 'svelte/store';
	import SeoHead from '$lib/SeoHead.svelte';
	import { browser } from '$app/env';

	let allPosts;
	const allTags = get(session).tags;

	let notes, navurl, more, pageNum;
	let filter = {
		label: false,
		kategori: false,
		hal: 1
	}
	const per = 9;



	const getQuery = name => {
		const query =  new URLSearchParams(document.location.search);
		return query.get(name)
	}
	$: {
		if (browser) {
			filter.label = getQuery('label') || false
			filter.kategori = getQuery('kategori') || false
		}

		console.log(filter)

		if (filter.label) {
			allPosts = get(session).notes.filter((post) =>
				post.tags.map((tag) => slugger(tag)).includes(filter.label)
			);
		} else if (filter.kategori) {
			allPosts = get(session).notes.filter((post) => slugger(post.category) === filter.kategori);
		} else {
			allPosts = get(session).notes;
		}
		pageNum = parseInt(filter?.hal || 1);
		delete filter.hal;
		more = allPosts.length - pageNum * per <= 0;
		notes = allPosts.slice(pageNum * per - per, pageNum * per);

		navurl = '?' + urlParamsToQuery(filter) + (Object.keys(filter).length ? '&' : '') + 'hal=';
	}
</script>

<SeoHead
	title="Catatan perjalanan setengah manusia"
	description="Tentang manusia yang ku amati dan teknologi yang ku pelajari"
/>

<header>
	<h1>
		Catatan
		{#if JSON.stringify(filter) !== '{}'}
			tentang
			{filter.label ? get(session).tags.filter((slug) => slugger(slug) === filter.label) : ''}
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

<CatatanList {notes} />

<div class="flex">
	<a href={navurl + (pageNum - 1)} class:hidden={pageNum <= 1}>Lebih baru</a>
	<a href={navurl + (pageNum + 1)} class="ml-auto" class:hidden={more}>Lebih lawas</a>
</div>

<style lang="postcss">
	header {
		@apply py-4 border-b-2 border-gray-500;
		h1 {
			@apply my-2 text-center;
		}
	}
</style>
