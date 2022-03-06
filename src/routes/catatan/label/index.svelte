<script context="module">
  import { get as getblogs } from '../_index'

  /** @type {import('@sveltejs/kit').Load} */
  export const load = async () => {
    let { tags } = await getblogs()

    return { props: { tags } }
  }
</script>

<script>
  import TagsCloud from '$lib/TagsCloud.svelte'
  export let tags
</script>

<div class="typography">
  <h1>Semua label catatan</h1>

  <TagsCloud {tags} />
</div>
