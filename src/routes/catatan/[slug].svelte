<script context="module" lang="ts">
  export async function load({ fetch, session, page, context }) {
    const post = await fetch(`${page.params.slug}.json`);
    return post.ok
      ? { props: { post: await post.json() } }
      : {
          status: 404,
          error: new Error('Tidak ada catatan seperti itu disini'),
        };
  }
</script>

<script lang="ts">
  import { localDate, slugger } from '../../components/util';
  import SeoHead from '../../components/SeoHead.svelte';

  export let post;
</script>

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
          <a href="/catatan?label={slugger(tag)}" class="first:ml-0 ml-3" rel="prefetch">#{tag}</a>
        {/each}
      </p>
      <p>{localDate(post.date)}</p>
    </header>
    {@html post.body}
  </article>
</div>

<style lang="postcss">
  header {
    & h1 {
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
