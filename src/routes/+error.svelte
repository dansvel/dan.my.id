<script>
  import { page } from '$app/stores'
</script>

<div class="typography">
  <h1>Oops!</h1>
  <h2>{$page.error.message}</h2>

  <p>Gunakan menu di atas untuk mejelajah blog ini.</p>
  <p>
    <a href="https://twitter.com/dansvel" rel="noopener external noreferrer"
      >Beritahu aku melalui Twitter</a
    > jika kamu berharap halaman ini berisi sesuatu.
  </p>
</div>
