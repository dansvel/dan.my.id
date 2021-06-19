<script>
  import Transition from '$lib/Transition.svelte'
  import SeoHead from '$lib/SeoHead.svelte'

  const tweet = `Tulis catatan tentang ... dong om @dansvel. dan.my.id`
</script>

<SeoHead title="Oops, di depan ada jurang" url="/404" />

<Transition key="Oops, di depan ada jurang">
  <div class="prose max-w-none">
    <h1>Oops!</h1>
    <h2>Di depan ada jurang</h2>

    <p>Silakan gunakan menu di atas untuk menjelajah blog ini.</p>
    <p>
      Berharap sesuatu untuk halaman ini?
      <a
        href="https://twitter.com/intent/tweet/?text={tweet}"
        target="_blank"
        rel="noopener"
      >
        Cuitkan tentang ini di Twitter
      </a>.
    </p>
  </div>
</Transition>

<style lang="postcss">
  div {
    @apply pt-4 text-center;
  }
</style>
