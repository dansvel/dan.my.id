<script lang="ts">
  import { dev } from '$app/env';
  import Transition from '../components/Transition.svelte';
  import SeoHead from '../components/SeoHead.svelte';

  export let status;
  export let error;
</script>

<SeoHead title="{status}! {error.message} - Blog milik Dan" />

<Transition>
  <div class="prose lg:prose-xl max-w-none">
    <h1>Oops!</h1>

    {#if error.message}
      <h2>Galat {status}! {error.message}.</h2>
    {:else}
      <h2>Hmm... Galat {status}?</h2>
    {/if}

    {#if dev && error.stack}
      <pre><code>{error.stack}</code></pre>
    {/if}

    {#if status >= 500}
      <p>
        Tolong muat ulang halaman. Dan jika galat masih terjadi, kamu dapat <a
          href="https://twitter.com/dansvel"
          rel="noopener">mengabariku di Twitter</a> tentang ini. Terima kasih!
      </p>
    {:else}
      <p>Silakan gunakan menu di atas untuk menjelajah blog ini.</p>
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
