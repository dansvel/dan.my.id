<script context="module">
  export const load = async ({
    page: {
      params: { slug }
    }
  }) => {
    let content
    const contents = await import.meta.glob('/src/routes/*.md')
    for (const path in contents) {
      if (slug === path.split('/').pop().split('.').shift()) {
        const { body, attributes } = (await contents[path]()).default
        content = { ...attributes, slug, body }
      }
    }
    return { props: { content } }
  }
</script>

<script>
  import Webmention from '$lib/Webmention.svelte'
  import { localDate } from '$lib/util.js'
  import SeoHead from '$lib/SeoHead.svelte'

  export let content
</script>

<SeoHead
  title={content.title}
  description={content.description}
  tags={content.tags}
  image={content.image}
/>

<article>
  <header>
    <h1>{content.title}</h1>
    <p>Diperbarui {localDate(content.date)}</p>
    {#if content.tags}
      <p>
        Label: {#each content.tags as tag}<span>{tag}</span> {/each}
      </p>
    {/if}
    <p>{content.description}</p>
  </header>

  {@html content.body}
</article>

<Webmention />

<style lang="postcss">
  article {
    @apply mb-5;
    header {
      @apply py-5 border-b-2 border-gray-200 dark:border-gray-800 mb-5;
      h1 {
        @apply my-2;
      }
      p {
        @apply text-gray-600 dark:text-gray-400 my-1;
        span {
          @apply bg-gray-200 dark:bg-gray-700 px-1;
        }
      }
    }
  }
</style>
