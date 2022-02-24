<script context="module">
  export function load({ params }) {
    if (!params.n.match(/^\d+$/)) return { fallthrough: true }

    return true
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

  $: console.log('morePosts', morePosts)
  $: console.log('posts', posts)
  $: console.log('tags', tags)

  $: currentPage = parseInt($page.params.n)
</script>

<div class="typography">
  <h1>Catatan halaman ke-{currentPage}</h1>

  <TagsCloud {tags} />
</div>

<PostList {posts} />
<Pagination {morePosts} {currentPage} path="catatan" />
