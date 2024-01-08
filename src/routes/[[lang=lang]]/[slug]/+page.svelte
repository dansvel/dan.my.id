<script>
	import Content from '$lib/component/Content.svelte'

	/** @type {import('$lib/server/content/index.js').getPost} */
	export let data
</script>

<Content {...data} />

<!--<nav>-->
<!--	{#if data.content.prev}-->
<!--		<a sveltekit:prefetch href="/{data.content.prev.slug}" class="btn btn-sm" id="prev">-->
<!--			<span class="mark">&laquo;</span>-->
<!--			<span>{data.content.prev.metadata.title}</span>-->
<!--		</a>-->
<!--	{/if}-->
<!--	{#if data.content.next}-->
<!--		<a-->
<!--			sveltekit:prefetch-->
<!--			href="/{data.content.next.slug}"-->
<!--			class="btn btn-sm inline-block"-->
<!--			id="next"-->
<!--		>-->
<!--			<span>{data.content.next?.metadata.title}</span>-->
<!--			<span class="mark">&raquo;</span>-->
<!--		</a>-->
<!--	{/if}-->
<!--</nav>-->

<style lang="postcss">
	nav {
		@apply flex flex-col mt-16 space-y-4;
		a {
			@apply flex flex-1 text-center px-6 space-x-5 overflow-hidden truncate normal-case;

			span:not(.mark) {
				@apply overflow-hidden;
			}
		}
		#prev {
			@apply justify-start;
			border-radius: 9999px 0 0 9999px;
		}
		#next {
			@apply justify-end;
			border-radius: 0 9999px 9999px 0;
		}
	}
</style>
