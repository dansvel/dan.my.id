<script>
	import { localDate, parseMarkdownLine, slugging } from '$lib/util.js'
	import { translatePath } from '$lib/i18n.js'
	import * as m from '$paraglide/messages.js'
	import SeoHead from '$lib/component/SeoHead.svelte'

	/** @type {import('$lib/server/content/types.js').Post} */
	export let post

	/** @type {string} */
	export let lang

	export let nav
</script>

<SeoHead
	url={translatePath(`/${post.slug}`, lang)}
	title={post.title}
	description={post.description}
	keywords={post.tags}
/>

<article>
	<header class="typography">
		<h1>{@html parseMarkdownLine(post.title)}</h1>
		<p>{@html parseMarkdownLine(post.description)}</p>
		<p class="metadata">
			{m.diperbarui()}: <time>{localDate(lang).format(new Date(post.date))}</time>&nbsp;
		</p>
		{#if post.translation}
			<a href="/{post.translation}">{m.terjemahkan(lang)}</a>
		{:else}
			<a href="#">{m.takAdaTerjemahan()}</a>
		{/if}
	</header>
	<!--	<div class="my-4">-->
	<!--		{#each post.tags as tag}-->
	<!--			<a href="/blog/tag/{slugging(tag)}" class="btn btn-sm normal-case">{tag}</a>&nbsp;-->
	<!--		{/each}-->
	<!--	</div>-->
	<div class="divider" />
	<div class="typography">
		{@html post.content}
	</div>
</article>

<div class="flex justify-between">
	{#if nav?.prev}
		<div>
			<a
				href={translatePath(`/${nav.prev.slug}`, lang)}
				class="btn btn-sm md:btn-md gap-2 lg:gap-3"
			>
				<svg
					class="h-6 w-6 fill-current md:h-8 md:w-8"
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
				>
					<path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path>
				</svg>
				<div class="flex flex-col items-start">
					<span class="text-base-content/50 hidden text-xs font-normal md:block"
						>{m.navSebelumnya()}</span
					>
					<span>{nav.prev.title}</span>
				</div>
			</a>
		</div>
	{:else}
		<div />
	{/if}
	{#if nav?.next}
		<div>
			<a
				href={translatePath(`/${nav.next.slug}`, lang)}
				class="btn btn-neutral btn-sm md:btn-md gap-2 lg:gap-3"
			>
				<div class="flex flex-col items-end">
					<span class="text-neutral-content/50 hidden text-xs font-normal md:block"
						>{m.navSelanjutnya()}</span
					>
					<span>{nav.next.title}</span>
				</div>
				<svg
					class="h-6 w-6 fill-current md:h-8 md:w-8"
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
				>
					<path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
				</svg>
			</a>
		</div>
	{:else}
		<div />
	{/if}
</div>
