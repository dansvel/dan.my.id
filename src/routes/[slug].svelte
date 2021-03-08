<script lang="ts" context="module">
  export async function load({ page, session }) {
    return {
      status: 404,
      error: new Error('Di depan ada jurang'),
    }
  }
</script>