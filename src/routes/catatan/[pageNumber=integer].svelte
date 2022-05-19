<script context="module">
  import { getPosts } from '$lib/content'
  import { page } from '$app/stores'

  /** @type {import('./[pageNumber=integer].svelte').load} */
  export async function load({ params: { pageNumber } }) {
    if (parseInt(pageNumber) === 1)
      return {
        redirect: '/',
        status: 301,
      }

    const { posts, more } = await getPosts({ pageNumber })

    if (posts.length)
      return {
        props: { pageNumber, posts, more },
      }

    return { status: 404 }
  }
</script>

<script>
  // import Pagination from '$lib/Pagination.svelte'
  // import TagsCloud from '$lib/TagsCloud.svelte'

  import PostList from '$lib/components/PostList.svelte'
  import Pagination from '$lib/components/Pagination.svelte'

  export let pageNumber
  export let posts
  export let more
</script>

<div class="typography">
  <h1>Catatan halaman ke-{pageNumber}</h1>

  <!--  <TagsCloud {tags} />-->
</div>

<PostList {posts} />
<Pagination {more} {pageNumber} path="catatan" />
