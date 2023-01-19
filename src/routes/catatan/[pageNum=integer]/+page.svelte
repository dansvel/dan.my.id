<script>
  import SeoHead from '$component/SeoHead.svelte'
  import PostList from '$component/PostList.svelte'
  import Pagination from '$component/Pagination.svelte'
  import site from '$lib/config.yaml'

  export let data
  // let posts
</script>

<SeoHead
  title="Catatan halaman ke-{data.pageNum}"
  description="Catatan halaman ke-{data.pageNum}"
  keywords={site.keywords}
/>

<div class="typography">
  <h1>Catatan halaman ke-{data.pageNum}</h1>

  <!--  <TagsCloud {tags} />-->
</div>

<PostList posts={data.posts} />
<Pagination more={data.more} pageNum={data.pageNum} path="catatan" />
