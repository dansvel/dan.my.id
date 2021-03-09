<script lang="ts">
  import { localDate } from '../util';
  import SeoHead from '../SeoHead.svelte';
  import Transition from '../Transition.svelte';

  export let content;
</script>

<SeoHead
  title="{content.title} - {content.subtitle}"
  description={content.description} />

{#key content}
  <Transition>
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
  </Transition>
{/key}

<style lang="postcss">
  header {
    @apply text-center;
    & h1 {
      @apply mb-4;
    }
  }
  footer {
    @apply text-right;
  }
</style>
