<script>
  import SeoHead from '$component/SeoHead.svelte'
  import PostList from '$component/PostList.svelte'
  import Pagination from '$component/Pagination.svelte'
  import site from '$lib/config.yaml'

  export let data
</script>

<SeoHead title={site.title} description={site.description} keywords={site.keywords} />

<div class="typography">
  <h1>Dan</h1>
  <h2>setengah manusia, setengah developer</h2>
</div>

<PostList posts={data.posts} />

<Pagination more={data.more} pageNumber="1" path="catatan" />
