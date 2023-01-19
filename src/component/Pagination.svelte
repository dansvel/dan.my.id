<script>
  export let pageNum
  export let more

  $: pageNum = parseInt(pageNum)
</script>

<nav>
  {#if pageNum - 1 > 0}
    <a sveltekit:prefetch href="/catatan/{pageNum - 1}" class="btn  btn-sm" id="prev">
      Lebih baru
    </a>
  {/if}

  {#if more}
    <a sveltekit:prefetch href="/catatan/{pageNum + 1}" class="btn  btn-sm" id="next">
      Lebih lawas
    </a>
  {/if}
</nav>

<style lang="postcss">
  nav {
    @apply flex mt-16 space-x-4;
    a {
      @apply flex-1 text-center;
    }

    #prev {
      @apply justify-start;
      border-radius: 9999px 0 0 9999px;
    }
    #next {
      @apply justify-end;
      border-radius: 0 9999px 9999px 0;
    }
  }
</style>
