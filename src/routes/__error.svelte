<script context="module">
  export function load({ error, status }) {
    return {
      props: {
        error, status
      }
    };
  }
</script>

<script>
  import SeoHead from '$lib/SeoHead.svelte';

  export let error, status;
  let title = `${status}: ${error.message}`
</script>

<SeoHead
        title={'dan.my.id - ' + title}
        description={title}
/>

<div>
  <article>
    <header>
      <h1>Oops, {error.message}</h1>
    </header>
    {#if status === 404}
    <p>Sepertinya kamu tersesat, mari aku tunjukkan jalan <a href="/">kembali</a>.</p>
    {/if}
    {#if status === 500}
    <p>Ada sesuatu yang sangat salah terjadi di sini. Jika halaman ini terus muncul, sudilah kiranya <a href="https://twitter.com/dansvel">memberitahuku</a>.</p>
    {/if}
  </article>
</div>