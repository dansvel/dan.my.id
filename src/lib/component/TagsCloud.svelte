<script>
	import { slugging } from '$lib/util'

	export let tags = []
</script>

<p>
	{#each tags as tag}
		<a sveltekit:prefetch href="/catatan/label/{slugging(tag)}" class="btn btn-sm my-1 normal-case"
			>{tag}</a
		> &nbsp;
	{/each}
</p>

<style lang="postcss">
	p {
		@apply text-center;
	}
</style>
