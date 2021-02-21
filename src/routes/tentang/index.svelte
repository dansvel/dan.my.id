<script lang="ts">
  import { localDate } from '../../components/util';
  import SeoHead from '../../components/SeoHead.svelte';
  import {onMount} from 'svelte';

  let content;

  onMount( async () => content = await fetch('tentang.json').then((r) => r.json()))
</script>
{#if content}
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
{/if}

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