<script context="module">
  import { get as getblogs } from './catatan/_index'
  import { blogsPerPage } from '$lib/config'

  /** @type {import('@sveltejs/kit').Load} */
  export const load = async () => {
    const { blogs } = await getblogs()
    const moreBlogs = blogs.length - blogsPerPage > 0

    return {
      props: {
        moreBlogs,
        blogs: blogs.slice(0, blogsPerPage),
      },
    }
  }
</script>

<script>
  import { default as content, metadata } from '$content/index.md'
  import BlogList from '$lib/BlogList.svelte'
  import Pagination from '$lib/Pagination.svelte'
  import SeoHead from '$lib/SeoHead.svelte'

  const { title, description } = metadata

  export let blogs = []
  export let moreBlogs
</script>

<SeoHead />

<article class="typography">
  <header>
    <h1>{title}</h1>
  </header>
  <svelte:component this={content} />
</article>

<BlogList {blogs} title="Catatan terbaru" />

<Pagination {moreBlogs} currentPage={1} path="catatan" />
