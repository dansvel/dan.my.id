<script context="module" lang="ts">
  export async function load({ fetch, session, page, context }) {
    return { props: { slug: page.params.slug} }
  }
</script>

<script lang="ts">
  import {localDate, slugger} from '../../components/util';
  import SeoHead from '../../components/SeoHead.svelte';
  import {onMount} from "svelte";

  export let slug;
  let post: {
    body: string,
    attributes: {
      title: string;
      description: string;
      tags: string[];
      category: string;
      image: string;
      date: string;
    }
  }

  let error = {}
  onMount(async () => {
    const content = await fetch(slug + '.json')
            .then(r => r.json()).catch(e=> {})

    console.log(typeof content === 'undefined' ? 'kosong' : 'ada')
    post = await typeof content !== 'undefined' ? content : false
    //         {
    //   body: 'asdasdadsadasdasdasd',
    //   attributes: {
    //     title: 'tidak ada',
    //     slug: 'tidak-ada',
    //     description: 'apapun disini',
    //     tags: ['asd', 'zxc'],
    //     category: 'qwe',
    //     image: 'images/perjalanan-setengah-manusia.png',
    //     date: '2021-01-08T17:48:41.471Z'
    //   }
    // }
    $: console.log(await post.tags)
  })
</script>
{#if post}
<SeoHead
  title="{post.title} - Blog milik Dan"
  description={post.description}
  image={post.image}
  tags={post.tags}
  url="/catatan/{post.slug}" />

<div class="prose lg:prose-xl max-w-none">
  <article>
    <header>
      <h1>{post.title}</h1>
      <p>
        <a href="/catatan?category={slugger(post.category)}" rel="prefetch">{post.category}</a>
        :
        {#each post.tags as tag}
          <a href="/catatan?label={slugger(tag)}" rel="prefetch">#{tag}</a> &zwj;
        {/each}
      </p>
      <p>{localDate(post.date)}</p>
    </header>
    {@html post.body}
  </article>
</div>
{:else }
<div class="prose lg:prose-xl max-w-none">
  <header>
    <h1>Oops</h1>
    <h2>Catatan seperti itu tidak ada</h2>
  </header>
</div>
{/if}

<style lang="postcss">
  header {
    & h1, & h2 {
      @apply text-center;
    }
    & p {
      @apply my-1;
    }
  }
  footer {
    @apply text-right;
  }
</style>