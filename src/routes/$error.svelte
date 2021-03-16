<script lang="ts">
  import { dev } from '$app/env';
  import Transition from '$components/Transition.svelte';
  import SeoHead from '$components/SeoHead.svelte';

  export let status;
  export let error;
</script>

<SeoHead title="Oops, {error.message} - Blog milik Dan" />

{#key error}
<Transition>
  <div class="prose lg:prose-xl max-w-none">
    <h1>Oops!</h1>

    {#if error.message}
      <h2>Oops, {error.message}.</h2>
    {:else}
      <h2>Hmm... Galat {status}?</h2>
    {/if}

    {#if dev && error.stack}
      <pre><code>{error.stack}</code></pre>
    {/if}

      <p>Silakan gunakan menu di atas untuk menjelajah blog ini.</p>
  </div>
</Transition>
{/key}

<style lang="postcss">
  div {
    @apply text-center;
    & pre {
      @apply text-left;
    }
  }
</style>
