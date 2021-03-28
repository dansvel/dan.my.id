<script>
  import { localDate } from '$lib/util'
  import SeoHead from '$lib/components/SeoHead.svelte'
  import Transition from '$lib/components/Transition.svelte'
  import Webmention from './components/Webmention.svelte'

  export let content
  export let url
</script>

<SeoHead
  title="{content.title} - {content.subtitle}"
  description={content.description}
  url="/{url}"
/>

<Transition key={content.title}>
  <div class="prose lg:prose-lg xl:prose-xl max-w-none">
    <article>
      <header>
        <h1>{content.title}</h1>
        <h2>{content.subtitle}</h2>
      </header>
      {@html content.body}
      <footer>
        <p>Diperbarui : {localDate(content.date)}</p>
      </footer>
    </article>
  </div>
  <Webmention path={url} />
</Transition>

<style lang="postcss">
  header {
    @apply text-center;
    h1 {
      @apply mb-2;
    }
    h2 {
      @apply my-2;
    }
  }
  footer {
    @apply text-right;
  }
</style>
