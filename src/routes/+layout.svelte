<script>
  import '../app.postcss'

  import Navbar from '$component/Navbar.svelte'
  import Footer from '$component/Footer.svelte'
</script>

<Navbar />
<div class="max-w-3xl mx-auto p-4">
  <slot />
</div>
<Footer />
