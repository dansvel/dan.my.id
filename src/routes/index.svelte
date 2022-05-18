<script context="module">
  import { getBlogs } from '$lib/content'

  /** @type {import('./index.svelte').load} */
  export const load = async () => {
    const { blogs, more } = await getBlogs({ pageNumber: 1 })
    return { props: { blogs, more } }
  }
</script>

<script>
  import { default as content, metadata } from '../content/index.md'
  import BlogList from '$lib/components/BlogList.svelte'
  import Pagination from '$lib/components/Pagination.svelte'
  import SeoHead from '$lib/components/SeoHead.svelte'
  import site from '$lib/config.yaml'

  export let blogs
  export let more
</script>

<SeoHead title={site.title} description={site.description} keywords={site.keywords} />

<article class="typography">
  <h1>{metadata.title}</h1>
  <p>{metadata.description}</p>
  <svelte:component this={content} />
</article>

<BlogList {blogs} />
<Pagination {more} pageNumber="1" path="catatan" />
