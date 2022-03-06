<script context="module">
  /** @type {import('@sveltejs/kit').Load} */
  export const load = async ({ params }) => {
    const files = import.meta.glob('../content/pages/*.md')

    let content
    for (const path in files) {
      if (path.match(params.slug)) content = await files[path]()
    }

    if (content) return { props: { content } }

    return { status: 404 }
  }
</script>

<script>
  import { page } from '$app/stores'
  import SeoHead from '$lib/SeoHead.svelte'

  export let content
</script>

<SeoHead
  url="/{$page.params.slug}"
  title={content.metadata.title}
  description={content.metadata.description}
  tags={content.metadata.tags}
  image="https://cdn.statically.io/og/{content.metadata.title}"
/>

<article class="typography">
  <header>
    <h1>{content.metadata.title}</h1>
  </header>
  <svelte:component this={content.default} />
</article>
