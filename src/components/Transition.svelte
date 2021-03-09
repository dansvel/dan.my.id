<script>
  import { fade } from 'svelte/transition';

  export let refresh = '';
</script>

{#key refresh}
  <main in:fade={{ duration: 300, delay: 150 }}>
    <slot />
  </main>
{/key}
