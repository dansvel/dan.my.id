<script>
  import { fade } from 'svelte/transition';
</script>

<main in:fade={{ duration: 300, delay: 150 }}>
  <slot />
</main>
