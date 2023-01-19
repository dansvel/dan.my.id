<script>
  import TagsCloud from '$component/TagsCloud.svelte'
  import SeoHead from '$component/SeoHead.svelte'
  import site from '$lib/config.yaml'

  export let data
</script>

<SeoHead
  title="Semua label catatan"
  description="Semua label catatan"
  keywords="{site.keywords}, label"
/>
<div class="typography">
  <h1>Semua label catatan</h1>
</div>

<TagsCloud tags={data.tags} />
