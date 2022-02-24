<script>
  export let currentPage
  export let morePosts
  export let path
</script>

<nav>
  {#if currentPage > 1}
    <a sveltekit:prefetch href="/{path}/{currentPage - 1}" class="button"> Lebih baru </a>
  {:else}
    <div></div>
  {/if}

  {#if morePosts}
    <a sveltekit:prefetch href="/{path}/{currentPage + 1}" class="button"> Lebih lawas </a>
  {:else}
    <div></div>
  {/if}
</nav>

<style lang="postcss">
  nav {
    @apply flex justify-between mt-16;
  }
</style>
