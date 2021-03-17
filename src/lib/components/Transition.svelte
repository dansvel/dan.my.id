<script>
  import { fade } from 'svelte/transition';
  export let key = '';
</script>

{#key key}
<main in:fade={{ duration: 300, delay: 150 }}>
  <slot />
</main>
{/key}