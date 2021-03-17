<script lang="ts" context="module">
  export async function load({ page, session }) {
    const pages = session.pages;
    const slugs = pages.map((page) => page.slug.match(/^(\d+-[a-z-]+)$/)[1])
    if (!slugs.includes(page.params.slug)) {
      return {
        status: 404,
        error: new Error('Catatan seperti itu tidak ada'),
      }
    }
  }
</script>

<script lang="ts">
  import { localDate, slugger } from '$lib/util';
  import SeoHead from '$lib/components/SeoHead.svelte';
  import Webmention from '$lib/components/Webmention.svelte';
  import Transition from '$lib/components/Transition.svelte';
  import {onMount} from "svelte";
  import { page } from '$app/stores';

  let post

  onMount(async () => {
    // @ts-ignore
    const res = await import(`../../../contents/post/${$page.params.slug}.md`)
    post = res.default
  })
</script>

{#if post}
<SeoHead
        title="{post.title} - Blog milik Dan"
        description={post.description}
        image={post.image}
        tags={post.tags}
        url="/catatan/{post.slug}" />

<Transition key="{post.title}">
  <div class="prose lg:prose-xl max-w-none">
    <article>
      <header>
        <h1>{post.title}</h1>
        <p>
          <a href="/catatan?category={slugger(post.category)}" rel="prefetch"
          >{post.category}</a>
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
  <footer>
    <Webmention url="{$page.host}{$page.path}"/>
  </footer>

</Transition>
{/if}
<style lang="postcss">
  article {
    & h1 {
      @apply text-center mb-2;
    }
    & p {
      @apply my-1
    }
  }
  footer {
    @apply mt-16;
  }
</style>
