<script lang="ts">
  import './_global.postcss';
  import Transition from '$lib/components/Transition.svelte';
  import SeoHead from '$lib/components/SeoHead.svelte';
</script>

<SeoHead title="Oops, di depan ada jurang - Blog milik Dan" />

<Transition key="Oops, di depan ada jurang - Blog milik Dan">
  <div class="prose lg:prose-xl max-w-none">
    <h1>Oops!</h1>
    <h2>Di depan ada jurang</h2>

    <p>Silakan gunakan menu di atas untuk menjelajah blog ini.</p>
  </div>
</Transition>

<style lang="postcss">
  div {
    @apply text-center;
    & pre {
      @apply text-left;
    }
  }
</style>
