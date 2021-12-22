<script>
  import BlogList from '$lib/BlogList.svelte'
  import content from './index.md'
  import { arrSortBy } from '$lib/util'
  import SeoHead from '$lib/SeoHead.svelte'

  const files = import.meta.globEager('../posts/*.md')
  const posts = []

  for (const path in files) {
    if (path.split('/').pop().match(/^\d/)) {
      const { attributes } = files[path]
      posts.push({
        url: path.split('/').pop().split('.').shift(),
        ...attributes
      })
    }
  }
</script>

<SeoHead />

<header>
  <h1>{content.attributes.title}</h1>
  <p>{content.attributes.subtitle}</p>
</header>
{@html content.body}

<h2>Catatan Perjalanan</h2>
<hr />
<BlogList blogs={arrSortBy(posts, 'url', { asc: false, natural: true })} />

<style lang="postcss">
  header {
    @apply py-5 text-center mb-2;
    h1 {
      @apply my-1;
    }
    p {
      @apply text-large;
    }
  }
</style>
