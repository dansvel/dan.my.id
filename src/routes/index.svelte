<script context="module">
  import { arrSortBy } from '$lib/util.js'

  export const load = async () => {
    const blogs = []
    const contents = await import.meta.glob('/src/routes/*.md')
    for (const path in contents) {
      const { attributes } = (await contents[path]()).default

      if (path.split('/').pop().match(/^\d/))
        blogs.push({
          slug: path.split('/').pop().split('.').shift(),
          ...attributes
        })
    }
    return {
      props: {
        blogs: arrSortBy(blogs, 'slug', { asc: false, natural: true })
      }
    }
  }
</script>

<script>
  import BlogList from '$lib/BlogList.svelte'
  import content from '/src/routes/index.md'

  export let blogs = []
</script>

<header>
  <h1>{content.attributes.title}</h1>
  <p>{content.attributes.subtitle}</p>
</header>
{@html content.body}

<h2>Catatan Perjalanan</h2>
<hr />
<BlogList {blogs} />

<style lang="postcss">
  header {
    @apply py-2 text-center mb-2;
    h1 {
      @apply my-1;
    }
    p {
      @apply text-large;
    }
  }
</style>
