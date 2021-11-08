<script>
	import 'virtual:windi.css';
	import './app.postcss';
	import Nav from '$lib/Nav.svelte';
	import { onMount } from 'svelte';

	import { localDate } from '$lib/util';
	import Webmention from '$lib/Webmention.svelte';
	import SeoHead from '$lib/SeoHead.svelte';

	import { session, page } from '$app/stores';
	import gads from '$lib/gads';
	import { browser } from '$app/env';

	let metadata;
	$: metadata = $session.pages.find((file) => file.slug === $page.path.split('/').pop());

	onMount(() => {
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			document.querySelector('link[title=Dark]').removeAttribute('disabled');
		} else {
			document.querySelector('link[title=Light]').removeAttribute('disabled');
		}
	});
</script>

<Nav />

<main>
	{#if !metadata}
		<slot />
	{:else}
		<SeoHead title={metadata.title} description={metadata.description} image={metadata.image} />
		<article>
			<header>
				<h1>{metadata.title}</h1>
				<h2>{metadata.subtitle}</h2>
				<small>Diperbarui {localDate(metadata.date)}</small>
			</header>
			<slot />
		</article>
		{#key metadata}
			<Webmention />
		{/key}
	{/if}
</main>

<style lang="postcss">
	article {
		@apply mb-5;
		header {
			@apply py-4 border-b-2 border-gray-500 mb-4;
			h1,
			h2 {
				@apply my-2 border-0;
			}
		}
	}
</style>
