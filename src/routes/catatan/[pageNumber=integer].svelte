<script context="module">
  import { getBlogs } from '$lib/content'
  import { page } from '$app/stores'

  /** @type {import('./[pageNumber=integer].svelte').load} */
  export async function load({ params: { pageNumber } }) {
    if (parseInt(pageNumber) === 1)
      return {
        redirect: '/',
        status: 301,
      }

    const { blogs, more } = await getBlogs({ pageNumber })

    if (blogs.length)
      return {
        props: { pageNumber, blogs, more },
      }

    return { status: 404 }
  }
</script>

<script>
  // import Pagination from '$lib/Pagination.svelte'
  // import TagsCloud from '$lib/TagsCloud.svelte'

  import BlogList from '$lib/components/BlogList.svelte'
  import Pagination from '$lib/components/Pagination.svelte'

  export let pageNumber
  export let blogs
  export let more
</script>

<div class="typography">
  <h1>Catatan halaman ke-{pageNumber}</h1>

  <!--  <TagsCloud {tags} />-->
</div>

<BlogList {blogs} />
<Pagination {more} {pageNumber} path="catatan" />
