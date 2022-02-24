<script context="module">
  export function load({ params }) {
    if (params.slug.match(/^\d+$/)) return { fallthrough: true }

    return true
  }
</script>

<script>
  import { page } from '$app/stores'
  // import SeoHead from '$lib/SeoHead.svelte'
  import { localDate, slugger } from '$lib/util.js'
  import Webmention from '$lib/Webmention.svelte'
  import SeoHead from '$lib/SeoHead.svelte'

  const files = import.meta.globEager('../../content/posts/*.md')
  let content

  $: for (const path in files) {
    if ($page.params.slug === path.split('/').pop().slice(0, -3)) {
      content = files[path]
    }
  }
</script>

<SeoHead
  url="/{$page.params.slug}"
  title={content.metadata.title}
  description={content.metadata.description}
  tags={content.metadata.tags}
  image="https://cdn.statically.io/og/theme=dark/{content.metadata.title}"
/>

<article class="typography">
  <header>
    <h1>{content.metadata.title}</h1>
    <p>
      <time datetime={content.metadata.date}>
        {localDate.format(new Date(content.metadata.date))}
      </time>
    </p>
    <p>
      {#each content.metadata.tags.sort() as tag}
        <a href="/catatan/label/{slugger(tag)}" class="button">#{tag}</a>
      {/each}
    </p>
    <p>{content.metadata.description}</p>
  </header>
  <svelte:component this={content.default} />
</article>

<Webmention />

<style lang="postcss">
  header {
    @apply mb-2 border-b-2 border-gray-500;

    p {
      a {
        @apply mr-3 whitespace-nowrap;
      }
    }
  }
</style>
