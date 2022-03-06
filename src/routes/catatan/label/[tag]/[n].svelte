<script context="module">
  import { get as getPosts } from '../../_index'
  import { postsPerPage } from '$lib/config'
  import { slugger } from '$lib/util'

  /** @type {import('@sveltejs/kit').Load} */
  export const load = async ({ params }) => {
    if (!params.n.match(/^\d+$/)) return { status: 404 }

    let { posts, tags } = await getPosts()

    posts = posts.filter(post => post.tags.map(tag => slugger(tag)).includes(params.tag))
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
  $: currentTag = tags.find(tag => slugger(tag) === $page.params.tag)
</script>

<div class="typography">
  <h1>{currentTag} - {currentPage}</h1>

  <TagsCloud {tags} />
</div>

<PostList {posts} />
<Pagination {morePosts} {currentPage} path="catatan/label/{$page.params.tag}" />
