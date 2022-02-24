<script context="module">
  /** @type {import('@sveltejs/kit').Load} */
  export const load = async () => {
    return {
      redirect: '/catatan/2',
      status: 301,
    }
  }
</script>
