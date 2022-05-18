<script context="module">
  import { getBlogs, getTags } from '$lib/content'
  import { page } from '$app/stores'
  import { slugging } from '$lib/util'

  /** @type {import('./[tag].svelte').load} */
  export async function load({ params }) {
    const { blogs } = await getBlogs({ filterTag: params.tag })
    const tags = await getTags()
    const tag = tags.find(tag => slugging(tag) === params.tag)
    return {
      props: { tag, blogs, tags },
    }

    // return { status: 404 };
  }
</script>

<script>
  // import Pagination from '$lib/Pagination.svelte'
  import TagsCloud from '$lib/components/TagsCloud.svelte'
  import BlogList from '$lib/components/BlogList.svelte'

  export let tag
  export let blogs
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

<BlogList {blogs} />
