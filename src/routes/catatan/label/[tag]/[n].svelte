<script context="module">
  import { get as getblogs } from '../../_index'
  import { blogsPerPage } from '$lib/config'
  import { slugger } from '$lib/util'

  /** @type {import('@sveltejs/kit').Load} */
  export const load = async ({ params }) => {
    if (!params.n.match(/^\d+$/)) return { status: 404 }

    let { blogs, tags } = await getblogs()

    blogs = blogs.filter(blog => blog.tags.map(tag => slugger(tag)).includes(params.tag))
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
  $: currentTag = tags.find(tag => slugger(tag) === $page.params.tag)
</script>

<div class="typography">
  <h1>{currentTag} - {currentPage}</h1>

  <TagsCloud {tags} />
</div>

<BlogList {blogs} />
<Pagination {moreblogs} {currentPage} path="catatan/label/{$page.params.tag}" />
