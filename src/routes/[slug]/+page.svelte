<script>
  /** @type {import('./$types').PageData} */
  import SeoHead from '$component/SeoHead.svelte'

  export let data
</script>

<SeoHead
  title={data.content.metadata.title}
  description={data.content.metadata.description}
  keywords={data.content.metadata.tags.join(', ')}
/>

<div class="typography">
  <h1>{data.content.metadata.title}</h1>
  <svelte:component this={data.content.default} />
</div>
