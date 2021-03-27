<script>
  import '../global.postcss'
  import Transition from '$lib/components/Transition.svelte'
  import SeoHead from '$lib/components/SeoHead.svelte'
</script>

<SeoHead title="Oops, sepertinya ada yang tidak benar - Blog milik Dan" url="/500" />

<Transition key="Oops, sepertinya ada yang tidak benar - Blog milik Dan">
  <div class="prose lg:prose-xl max-w-none">
    <h1>Oops!</h1>
    <h2>Sepertinya ada yang tidak benar</h2>

    <p>
      Jika halaman ini terus muncul, tolong beri tahu aku via <a
        href="https://twitter.com/dansvel"
        target="_blank"
        rel="noopener">Twitter</a
      >
    </p>
  </div>
</Transition>

<style lang="postcss">
  div {
    @apply text-center;
  }
</style>
