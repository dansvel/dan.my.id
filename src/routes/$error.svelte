<script lang="ts">
  import {onMount} from 'svelte';

  let dev
  export let status;
  export let error;

  onMount(() => dev = process.env.NODE_ENV === 'development')
  const online = typeof navigator !== 'undefined' ? navigator.onLine : true;
</script>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<div class="prose lg:prose-xl max-w-none text-center">
  {#if online}
    <h1>Oops!</h1>

    {#if error.message}
      <h2>Galat {status}! {error.message}</h2>
    {:else}
      <h2>Encountered a {status} error</h2>
    {/if}

    {#if dev && error.stack}
      <pre>{error.stack}</pre>
    {:else}
      {#if status >= 500}
        <p>Tolong muat ulang halaman. Dan jika galat masih terjadi, kamu dapat <a href="https://twitter.com/dansvel" rel="noopener">mengabariku di Twitter</a> tentang ini. Terima kasih!</p>
      {:else}
        <p>Silakan gunakan menu di atas untuk menjelajah blog ini. Terima kasih.</p>
      {/if}
    {/if}
  {:else}
    <h1>Sepertinya kamu sedang luring</h1>

    <p>Muat ulang halaman ini ketika kamu kembali daring nanti.</p>
  {/if}
</div>
