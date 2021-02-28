<script lang="ts">
  import ErrorPage from './$error.svelte';

  const error = {
    message: 'Di depan ada jurang',
  };
</script>

<ErrorPage status="404" {error} />
