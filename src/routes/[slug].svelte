<script context="module">
  import { getPage } from '../lib/content.js'

  /** @type {import('./[slug].svelte').load} */
  export const load = async ({ params }) => {
    const content = await getPage(params.slug)
    if (content) return { props: { content } }
    return { status: 404 }
  }
</script>

<script>
  import SeoHead from '$lib/components/SeoHead.svelte'

  export let content
</script>

<SeoHead
  title={content.metadata.title}
  description={content.metadata.description}
  keywords={content.metadata.tags.join(', ')}
/>

<div class="typography">
  <h1>{content.metadata.title}</h1>
  <svelte:component this={content.default} />
</div>
