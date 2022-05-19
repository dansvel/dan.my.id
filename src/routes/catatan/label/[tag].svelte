<script context="module">
  import { getPosts, getTags } from '$lib/content'
  import { page } from '$app/stores'
  import { slugging } from '$lib/util'

  /** @type {import('./[tag].svelte').load} */
  export async function load({ params }) {
    const { posts } = await getPosts({ filterTag: params.tag })
    const tags = await getTags()
    const tag = tags.find(tag => slugging(tag) === params.tag)
    return {
      props: { tag, posts, tags },
    }

    // return { status: 404 };
  }
</script>

<script>
  // import Pagination from '$lib/Pagination.svelte'
  import TagsCloud from '$lib/components/TagsCloud.svelte'
  import PostList from '$lib/components/PostList.svelte'

  export let tag
  export let posts
  export let tags
</script>

<div class="typography">
  <h1>
    <small>Catatan tentang : </small>
    <br />
    {tag}
  </h1>

  <TagsCloud {tags} />
</div>

<PostList {posts} />
