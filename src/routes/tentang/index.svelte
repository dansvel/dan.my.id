<script lang="ts" context="module">
  export async function load({ fetch }) {
    const content = await fetch('tentang.json').then((r) => r.json());
    return {
      props: {
        content: content,
      },
    };
  }
</script>

<script lang="ts">
  import { localDate } from '../../components/util';
  import SeoHead from '../../components/SeoHead.svelte';

  export let content;
</script>

<SeoHead title={content.title} description={content.description} />

<article class="prose lg:prose-xl max-w-none">
  <header>
    <h1>{content.title}</h1>
    <h2>{content.subtitle}</h2>
  </header>
  {@html content.body}
  <footer>
    <p>Diperbarui : {localDate(content.date)}</p>
  </footer>
</article>

<style lang="postcss">
  header {
    @apply text-center;
    & h1 {
      @apply mb-4;
    }
    & h2 {
      @apply my-4;
    }
  }
  footer {
    @apply text-right;
  }
</style>
