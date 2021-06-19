<script>
  import { localDate, slugger } from '$lib/util'
  import SeoHead from '$lib/SeoHead.svelte'
  import Webmention from './Webmention.svelte'

  export let content
  // export let slug
</script>

<SeoHead title={content.title} description={content.description} />

<div class="prose max-w-none">
  <article>
    <header>
      <h1>{content.title}</h1>
      {#if content.subtitle}<h2>{content.subtitle}</h2>{/if}
      <div class="text-sm text-gray-500">Diperbarui : {localDate(content.date)}</div>
      {#if content.category}
        <div>
          Tentang <a href="/catatan?kategori={slugger(content.category)}"
            >{content.category}</a
          >
        </div>
      {/if}
      {#if content.tags}
        <div>
          Label :
          {#each content.tags as tag}
            <a href="/catatan?label={slugger(tag)}">#{tag}</a> &zwj;&nbsp;
          {/each}
        </div>
      {/if}
    </header>
    {@html content.body}
  </article>
</div>
<Webmention />

<style lang="postcss">
  header {
    @apply py-4 border-b-2;
    transition: border-bottom-color 0.5s;
    :global(.dark) & {
      @apply border-gray-800;
    }
    h1,
    h2 {
      @apply my-2;
    }
  }
</style>
