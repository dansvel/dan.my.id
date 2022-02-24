<script>
  // import Webmention from '$lib/Webmention.svelte'
  // import { localDate } from '$lib/util.js'
  // import SeoHead from '$lib/SeoHead.svelte'
  import { page } from '$app/stores'
  import SeoHead from '$lib/SeoHead.svelte'

  const files = import.meta.globEager('../content/pages/*.md')
  let content

  $: for (const path in files) {
    if ($page.params.slug === path.split('/').pop().slice(0, -3)) {
      content = files[path]
    }
  }
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
