<script>
  import Transition from '$lib/Transition.svelte'
  import SeoHead from '$lib/SeoHead.svelte'
  const tweet = 'dan.my.id error tuh om @dansvel'
</script>

<SeoHead title="Oops, sepertinya ada yang tidak benar" url="/500" />

<Transition key="Oops, sepertinya ada yang tidak benar">
  <div class="prose max-w-none">
    <h1>Oops!</h1>
    <h2>Sepertinya ada yang tidak benar</h2>

    <p>
      Jika halaman ini terus muncul,
      <a
        href="https://twitter.com/intent/tweet/?text={tweet}"
        target="_blank"
        rel="noopener"
      >
        cuitkan saja di Twitter
      </a>.
    </p>
  </div>
</Transition>

<style lang="postcss">
  div {
    @apply pt-4 text-center;
  }
</style>
