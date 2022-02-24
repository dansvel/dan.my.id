<script>
  import { slugger } from '$lib/util.js'

  export let tags = []
</script>

<p>
  {#each tags as tag}
    <a sveltekit:prefetch href="/catatan/label/{slugger(tag)}/1" class="button">{tag}</a>
  {/each}
</p>

<style lang="postcss">
  p {
    @apply text-center;
    a {
      @apply mr-3 whitespace-nowrap;
    }
  }
</style>
