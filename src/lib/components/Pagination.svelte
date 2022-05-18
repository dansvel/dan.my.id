<script>
  export let pageNumber
  export let more

  $: pageNumber = parseInt(pageNumber)
</script>

<nav>
  {#if pageNumber - 1 > 1}
    <a sveltekit:prefetch href="/catatan/{pageNumber - 1}" class="button"> Lebih baru </a>
  {/if}

  {#if more}
    <a sveltekit:prefetch href="/catatan/{pageNumber + 1}" class="button"> Lebih lawas </a>
  {/if}
</nav>

<style lang="postcss">
  nav {
    @apply flex mt-16 space-x-4;
    * {
      @apply flex-1 text-center;
    }
  }
</style>
