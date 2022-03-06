<script context="module">
  import { get as getblogs } from './_index'
  import { blogsPerPage } from '$lib/config'

  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ params }) {
    if (!params.n.match(/^\d+$/)) return { fallthrough: true }

    if (parseInt(params.n) === 1)
      return {
        redirect: '/',
        status: 301,
      }

    let { blogs, tags } = await getblogs()

    const moreblogs = blogs.length - params.n * blogsPerPage > 0
    blogs = blogs.slice(params.n * blogsPerPage - blogsPerPage, params.n * blogsPerPage)

    if (blogs.length)
      return {
        props: { moreblogs, blogs, tags },
      }

    return { status: 404 }
  }
</script>

<script>
  import { page } from '$app/stores'
  import BlogList from '$lib/BlogList.svelte'
  import Pagination from '$lib/Pagination.svelte'
  import TagsCloud from '$lib/TagsCloud.svelte'

  export let moreblogs
  export let blogs = []
  export let tags = []

  $: currentPage = parseInt($page.params.n)
</script>

<div class="typography">
  <h1>Catatan halaman ke-{currentPage}</h1>

  <TagsCloud {tags} />
</div>

<BlogList {blogs} />
<Pagination {moreblogs} {currentPage} path="catatan" />
