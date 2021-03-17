<script lang="ts">
  import './_global.postcss';
  import { dev } from '$app/env';
  import Transition from '$lib/components/Transition.svelte';
  import SeoHead from '$lib/components/SeoHead.svelte';

  export let status;
  export let error;
  console.log(status, error);
  const message = status === 404 ? 'Di depan ada jurang' : 'Sepertinya ada yang tidak benar';
</script>

<SeoHead title="Oops, {message.toLowerCase()} - Blog milik Dan" />

<Transition key="{message}">
  <div class="prose lg:prose-xl max-w-none">
    <h1>Oops!</h1>
    <h2>{message}</h2>

    {#if dev && error.stack}
      <pre><code>{error.stack}</code></pre>
    {/if}

    {#if status === 404 }
    <p>Silakan gunakan menu di atas untuk menjelajah blog ini.</p>
    {:else}
    <p>Jika halaman ini terus muncul, tolong beri tahu aku via <a href="https://twitter.com/dansvel" target="_blank" rel="noopener">Twitter</a></p>
    {/if}
  </div>
</Transition>

<style lang="postcss">
  div {
    @apply text-center;
    & pre {
      @apply text-left;
    }
  }
</style>
