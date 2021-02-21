<script lang="ts">
  export let status;
  export let error;
</script>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<div class="prose lg:prose-xl max-w-none text-center">
  <h1>Oops!</h1>

  {#if error.message}
    <h2>Galat {status}! {error.message}</h2>
  {:else}
    <h2>Encountered a {status} error</h2>
  {/if}

  {#if status >= 500}
    <p>Tolong muat ulang halaman. Dan jika galat masih terjadi, kamu dapat <a href="https://twitter.com/dansvel" rel="noopener">mengabariku di Twitter</a> tentang ini. Terima kasih!</p>
  {:else}
    <p>Silakan gunakan menu di atas untuk menjelajah blog ini. Terima kasih.</p>
  {/if}
</div>
