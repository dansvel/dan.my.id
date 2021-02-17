<script>
  const dev = process.env.NODE_ENV === 'development';

  export let status;
  export let error;

  // we don't want to use <svelte:window bind:online> here,
  // because we only care about the online state when
  // the page first loads
  const online = typeof navigator !== 'undefined' ? navigator.onLine : true;
</script>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<div class="prose lg:prose-xl max-w-none text-center">
  {#if online}
    <h1>Oops!</h1>

    {#if error.message}
      <h2>{status}</h2>
    {:else}
      <h2>Encountered a {status} error</h2>
    {/if}

    {#if dev && error.stack}
      <pre>{error.stack}</pre>
    {:else}
      {#if status >= 500}
        <p>Please try reloading the page.</p>
      {/if}

      <p>
        If the error persists, you can <a href="https://twitter.com/dansvel">contact me on Twitter</a> and let me know. Thanks!
      </p>
    {/if}
  {:else}
    <h1>It looks like you're offline</h1>

    <p>Reload the page once you've found the internet.</p>
  {/if}
</div>
