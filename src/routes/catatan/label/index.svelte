<script context="module">
  import { getTags } from '$lib/content'

  /** @type {import("./index").load} */
  export const load = async () => {
    const tags = await getTags()

    if (tags) return { props: { tags } }
    return { status: 404 }
  }
</script>

<script>
  import TagsCloud from '$lib/components/TagsCloud.svelte'
  export let tags
</script>

<div class="typography">
  <h1>Semua label catatan</h1>

  <TagsCloud {tags} />
</div>
