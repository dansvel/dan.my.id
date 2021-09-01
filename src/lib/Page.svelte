<script>
	import { localDate, slugger } from '$lib/util';
	import SeoHead from '$lib/SeoHead.svelte';
	import Webmention from './Webmention.svelte';
	import { page } from '$app/stores';

	export let content;
</script>

<SeoHead
	title={content.title}
	description={content.description}
	tags={content?.tags}
	image={content.image}
/>

<div>
	<article>
		<header>
			<h1>{content.title}</h1>
			{#if content.subtitle}<h2>{content.subtitle}</h2>{/if}
			<!--googleoff: index-->
			<div class="text-sm text-gray-500">Diperbarui : {localDate(content.date)}</div>
			{#if content.category}
				<div>
					Tentang <a href="/catatan?kategori={slugger(content.category)}">{content.category}</a>
				</div>
			{/if}
			{#if $page.path.match(/catatan/) && content.tags}
				<div>
					Label :
					{#each content.tags as tag}
						<a href="/catatan?label={slugger(tag)}">#{tag}</a> &zwj;&nbsp;
					{/each}
				</div>
			{/if}
			<!--googleon: index-->
		</header>
		{@html content.body}
	</article>
</div>
<Webmention />

<style lang="postcss">
	article {
		@apply mb-4;
		header {
			@apply py-4 border-b-2 border-gray-500 mb-4;
			h1,
			h2 {
				@apply my-2;
			}
		}
	}
</style>
