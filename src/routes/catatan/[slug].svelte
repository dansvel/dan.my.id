<script lang="ts" context="module">
  import { dev } from '$app/env';
  const slugRegex = /^(\d+-[a-z-]+)$/;

  export async function load({ page, session }) {
    const { slug } = page.params;
    const pages = session.pages;
    const slugs = Object.fromEntries(
      pages.map((page) => [page.slug.match(slugRegex)[1], page])
    );

    if (slug in slugs) {
      let filepath = '.';
      let piece1 = '.';
      let piece2 = '.';
      let piece3 = '.';
      if (dev) {
        piece1 = '../..';
        piece2 = '_content';
        piece3 = 'post';
      }
      // @ts-ignore
      const { default: post } = await import(`./${piece1}/${piece2}/${piece3}/${page.params.slug}.js`);
      return {
        props: { post },
      };
    } else {
      return {
        status: 404,
        error: new Error('Catatan seperti itu tidak ada'),
      };
    }
  }
</script>

<script lang="ts">
  import { localDate, slugger } from '../../components/util';
  import SeoHead from '../../components/SeoHead.svelte';
  // import Webmention from '../../components/Webmention.svelte';
  import Transition from '../../components/Transition.svelte';

  export let post;
</script>

<SeoHead
  title="{post.title} - Blog milik Dan"
  description={post.description}
  image={post.image}
  tags={post.tags}
  url="/catatan/{post.slug}" />

{#key post}
  <Transition>
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
    <!--    <footer>-->
    <!--      <Webmention />-->

  </Transition>
{/key}

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
  }
</style>
