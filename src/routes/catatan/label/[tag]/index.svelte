<script context="module">
  /** @type {import('@sveltejs/kit').Load} */
  export const load = async ({ params }) => {
    return {
      redirect: `/catatan/label/${params.tag}/1`,
      status: 301,
    }
  }
</script>
