<script>
  // import Pagination from '$lib/Pagination.svelte'
  import TagsCloud from '$component/TagsCloud.svelte'
  import PostList from '$component/PostList.svelte'
  import SeoHead from '$component/SeoHead.svelte'
  import site from '$lib/config.yaml'

  export let data
</script>

<SeoHead
  title="Catatan tentang : {data.tag}"
  description="Catatan tentang : {data.tag}"
  keywords="{site.keywords}, {data.tag}"
/>

<div class="typography">
  <h1>
    <small>Catatan tentang : </small>
    <br />
    {data.tag}
  </h1>
</div>
<TagsCloud tags={data.tags} />

<PostList posts={data.posts} />
