<script>
  import { fade } from 'svelte/transition'
  export let key = ''
</script>

{#key key}
  <main in:fade={{ duration: 300, delay: 150 }}>
    <slot />
  </main>
{/key}

<style lang="postcss">
  main {
    @apply px-8 pb-16 pt-32 md:pt-24 mx-auto max-w-4xl;
  }
</style>
