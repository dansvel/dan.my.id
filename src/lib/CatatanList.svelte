<script>
	import { localDate, slugger } from '$lib/util';

	export let title;
	export let notes;
</script>

<section>
	{#if title}
		<h2>{title}</h2>
	{/if}
	{#each notes as note}
		<article>
			<h3><a sveltekit:prefetch href="/catatan/{note.slug}">{note.title}</a></h3>
			<small>{localDate(note.date)}</small>
			<div>
				{#each note.tags as tag}
					<a sveltekit:prefetch href="/catatan/?label={slugger(tag)}">#{tag}</a>
					<span class="last:hidden">&nbsp;</span>
				{/each}
			</div>
			<p>{note.description}</p>
		</article>
	{:else}
		<blockquote>Oops, belum ada catatan tentang itu</blockquote>
	{/each}
</section>

<style lang="postcss">
	section {
		@apply mt-2 divide-y-2 divide-gray-500;
		h2 {
			@apply text-center my-2 border-0;
		}
		article {
			@apply py-4 h-full;
			h3 {
				@apply mt-2 md:mt-0 mb-2 border-0;
				a {
					@apply border-b hover:(border-b-3)
            text-indigo-700 dark:text-indigo-300
            visible m-0;
				}
			}
			small {
				@apply text-gray-500;
			}
			p {
				@apply mt-2 mb-0;
			}
		}
	}
</style>
