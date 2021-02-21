<script lang="ts">
  import { localDate } from '../components/util';
  import SeoHead from '../components/SeoHead.svelte';
  import {onMount} from 'svelte';

  let content;

  onMount( async () => content = await fetch('index.json').then((r) => r.json()))
</script>

{#if content}
<SeoHead title="{content.title} - {content.subtitle}" description={content.description} />

<div class="prose lg:prose-xl max-w-none">
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
