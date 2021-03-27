<script>
  import '../../global.postcss'
  import Transition from '$lib/components/Transition.svelte'
  import SeoHead from '$lib/components/SeoHead.svelte'
</script>

<SeoHead
  title="Oops, catatan seperti itu tidak ada - Blog milik Dan"
  url="/catatan/404"
/>

<Transition key="Oops, catatan seperti itu tidak ada - Blog milik Dan">
  <div class="prose lg:prose-xl max-w-none">
    <h1>Oops!</h1>
    <h2>Catatan seperti itu tidak ada</h2>

    <p>Silakan gunakan menu di atas untuk menjelajah blog ini.</p>
  </div>
</Transition>

<style lang="postcss">
  div {
    @apply text-center;
  }
</style>
