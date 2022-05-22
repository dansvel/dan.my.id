<script context="module">
  import { getPosts } from '$lib/content'

  /** @type {import('./index.svelte').load} */
  export const load = async () => {
    const { posts, more } = await getPosts({ pageNumber: 1 })
    return { props: { posts, more } }
  }
</script>

<script>
  import { default as content, metadata } from '../content/index.md'
  import PostList from '$lib/components/PostListN.svelte'
  import Pagination from '$lib/components/Pagination.svelte'
  import SeoHead from '$lib/components/SeoHead.svelte'
  import site from '$lib/config.yaml'

  export let posts
  export let more
</script>

<SeoHead title={site.title} description={site.description} keywords={site.keywords} />

<article class="typography">
  <h1>{metadata.title}</h1>
  <p>{metadata.description}</p>
  <svelte:component this={content} />
</article>

<PostList {posts} />
<!--<div class="typography">-->
<!--<ul>-->
<!--{#each posts as post}-->
<!--  <li>{post.metadata.title}</li>-->
<!--{/each}-->
<!--</ul>-->
<!--</div>-->

<Pagination {more} pageNumber="1" path="catatan" />
