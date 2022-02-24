<script>
  import { page } from '$app/stores'
  import PostList from '$lib/PostList.svelte'
  import Pagination from '$lib/Pagination.svelte'
  import { slugger } from '$lib/util.js'
  import TagsCloud from '$lib/TagsCloud.svelte'

  export let morePosts
  export let posts = []
  export let tags = []

  $: currentPage = parseInt($page.params.n)
  $: currentTag = tags.find(tag => slugger(tag) === $page.params.tag)
  // $: console.log(allTags)
</script>

<div class="typography">
  <h1>{currentTag} - {currentPage}</h1>

  <TagsCloud {tags} />
</div>

<PostList {posts} />
<Pagination {morePosts} {currentPage} path="catatan/label/{$page.params.tag}" />
