<script>
  import Webmention from '$lib/Webmention.svelte'
  import { localDate } from '$lib/util.js'
  import SeoHead from '$lib/SeoHead.svelte'
  import { page } from '$app/stores'

  const files = import.meta.globEager('./_posts/*.md')
  let content

  for (const path in files) {
    // console.log($page.path)

    if ($page.path.substring(1) === path.split('/').pop().split('.').shift()) {
      content = files[path]
    }
  }
  const {
    attributes: { title, description, tags, image, date },
    body
  } = content
</script>

<SeoHead {title} {description} {tags} {image} />

<article>
  <header>
    <h1>{title}</h1>
    <p>Diperbarui {localDate(date)}</p>
    {#if tags}
      <p>
        Label: {#each tags as tag}<span>{tag}</span>{' '}{/each}
      </p>
    {/if}
    <p>{description}</p>
  </header>

  {@html body}
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
