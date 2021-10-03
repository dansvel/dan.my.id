<script>
  import { slugger, localDate } from '$lib/util';
  import Webmention from '$lib/Webmention.svelte';
  import SeoHead from '$lib/SeoHead.svelte';

  import { session, page } from '$app/stores';

  let note;
  $: note = $session.notes.find((note) => note.slug === $page.path.split('/').pop());
</script>

{#if note}
  <SeoHead title={note.title} description={note.description} tags={note.tags} image={note.image} />

  <article>
    <header>
      <h1>{note.title}</h1>
      <small>Diperbarui {localDate(note.date)}</small>
      <div>
        Tentang <a sveltekit:prefetch href="/catatan?kategori={slugger(note.category)}"
          >{note.category.toLowerCase()}</a
        >
      </div>
      <div>
        Label :
        {#each note.tags as tag}
          <a sveltekit:prefetch href="/catatan?label={slugger(tag)}">#{tag}</a> &zwj;&nbsp;
        {/each}
      </div>
    </header>
    <slot />
  </article>

  {#key note}
    <Webmention />
  {/key}
{:else}
  <slot />
{/if}

<style lang="postcss">
  article {
    @apply mb-5;
    header {
      @apply py-5 border-b-2 border-gray-500 mb-5;
      h1 {
        @apply my-2;
      }
      small {
        @apply text-gray-500;
      }
    }
  }
</style>
