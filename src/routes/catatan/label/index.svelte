<script>
  import TagsCloud from '$lib/TagsCloud.svelte'
  export let tags
</script>

<div class="typography">
  <h1>Semua label catatan</h1>

  <TagsCloud {tags} />
</div>
