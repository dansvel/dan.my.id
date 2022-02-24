<script>
  import { default as content, metadata } from '$content/index.md'
  import PostList from '$lib/PostList.svelte'
  import Pagination from '$lib/Pagination.svelte'
  import SeoHead from '$lib/SeoHead.svelte'

  const { title, description, image } = metadata
  export let posts = []
  export let morePosts
</script>

<SeoHead />

<article class="typography">
  <header>
    <h1>{title}</h1>
  </header>
  <svelte:component this={content} />
</article>

<PostList {posts} title="Catatan terbaru" />

<Pagination {morePosts} currentPage={1} path="catatan" />
