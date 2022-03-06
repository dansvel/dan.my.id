<script context="module">
  import { get as getPosts } from './_index'
  import { postsPerPage } from '$lib/config'

  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ params }) {
    if (!params.n.match(/^\d+$/)) return { fallthrough: true }

    if (parseInt(params.n) === 1)
      return {
        redirect: '/',
        status: 301,
      }

    let { posts, tags } = await getPosts()

    const morePosts = posts.length - params.n * postsPerPage > 0
    posts = posts.slice(params.n * postsPerPage - postsPerPage, params.n * postsPerPage)

    if (posts.length)
      return {
        props: { morePosts, posts, tags },
      }

    return { status: 404 }
  }
</script>

<script>
  import { page } from '$app/stores'
  import PostList from '$lib/PostList.svelte'
  import Pagination from '$lib/Pagination.svelte'
  import TagsCloud from '$lib/TagsCloud.svelte'

  export let morePosts
  export let posts = []
  export let tags = []

  $: currentPage = parseInt($page.params.n)
</script>

<div class="typography">
  <h1>Catatan halaman ke-{currentPage}</h1>

  <TagsCloud {tags} />
</div>

<PostList {posts} />
<Pagination {morePosts} {currentPage} path="catatan" />
