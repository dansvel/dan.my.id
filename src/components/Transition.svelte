<script>
  import { fade } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';

  export let refresh = '';
</script>

{#key refresh}
  <main out:fade={{ duration: 250 }} in:fade={{ duration: 250, delay: 250 }}>
    <slot />
  </main>
{/key}
