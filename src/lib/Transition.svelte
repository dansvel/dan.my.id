<script>
  import { fade } from 'svelte/transition'
  export let key = ''
</script>

{#key key}
  <main in:fade={{ duration: 500, delay: 550 }} out:fade={{ duration: 500 }}>
    <slot />
  </main>
{/key}
