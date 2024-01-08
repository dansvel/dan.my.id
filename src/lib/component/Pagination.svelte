<script>
	export let pageNum
	export let more

	$: pageNum = parseInt(pageNum)
</script>

<nav>
	{#if pageNum - 1 > 0}
		<a sveltekit:prefetch href="/catatan/{pageNum - 1}" class="btn btn-sm" id="prev">
			Lebih baru
		</a>
	{/if}

	{#if more}
		<a sveltekit:prefetch href="/catatan/{pageNum + 1}" class="btn btn-sm" id="next">
			Lebih lawas
		</a>
	{/if}
</nav>

<div class="flex justify-between">
	<div>
		<a href="/components/indicator/" class="btn btn-sm md:btn-md gap-2 lg:gap-3">
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
				<span class="text-base-content/50 hidden text-xs font-normal md:block">Sebelumnya</span>
				<span>Indicator</span>
			</div>
		</a>
	</div>
	<div>
		<a href="/components/mask/" class="btn btn-neutral btn-sm md:btn-md gap-2 lg:gap-3">
			<div class="flex flex-col items-end">
				<span class="text-neutral-content/50 hidden text-xs font-normal md:block">Selanjutnya</span>
				<span>Mask</span>
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
</div>

<style lang="postcss">
	nav {
		@apply flex mt-16 space-x-4;

		a {
			@apply flex-1 text-center;
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
