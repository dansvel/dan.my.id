<script>
  import { slugging } from '../util.js'

  export let tags = []
</script>

<p>
  {#each tags as tag}
    <a sveltekit:prefetch href="/catatan/label/{slugging(tag)}" class="button">{tag}</a> &nbsp;
  {/each}
</p>

<style lang="postcss">
  p {
    @apply text-center;
  }
</style>
