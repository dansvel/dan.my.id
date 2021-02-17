<script context="module" lang="ts">
  import { getUrlParams, arrSortBy } from '../../components/util';

  export async function load({ fetch, session, page, context }) {
    const filter = (await page.query) ? getUrlParams(page.query.toString()) : {};
    const posts = await fetch('/catatan.json').then((r) => r.json());
    return {
      props: {
        posts: arrSortBy(posts, 'date', false),
        filter: filter,
      },
    };
  }
</script>

<script lang="ts">
  import { slugger, localDate, arrUnion } from '../../components/util';
  import { afterUpdate } from 'svelte';
  import SeoHead from '../../components/SeoHead.svelte';

  export let posts: {
    slug: string;
    title: string;
    description: string;
    tags: string[];
    category: string;
    image: string;
    date: string;
  }[];
  export let filter: { label?: string[]; kategori?: string };

  let allTags = arrUnion(posts.map((post) => [...post.tags]));

  $: {
    if (filter.label) posts = posts.filter((post) => post.tags.map((tag) => slugger(tag)).includes(filter.label));
    if (filter.kategori) posts = posts.filter((post) => slugger(post.category) === filter.kategori);
  }
</script>

<SeoHead title="Catatan - dan.my.id" description="Tentang Pemrograman yang aku pelajari dan manusia yang aku teliti." />

<div class="prose lg:prose-xl max-w-none">
  <header>
    <h1>
      Catatan {filter.kategori ? 'mengenai ' + filter.kategori : ''}
      {filter.label ? 'mengenai ' + filter.label : ''}
    </h1>
    <p>
      Tentang: <a href="/catatan?kategori=manusia" rel="prefetch">manusia</a>
      atau <a href="/catatan?kategori=teknologi" rel="prefetch">teknologi</a>
    </p>
    <p>
      Label:
      {#each allTags as tag}
        <a href="/catatan?label={slugger(tag)}" rel="prefetch">#{tag}</a> &zwj;
      {/each}
    </p>
  </header>
  <section>
    {#each posts as post}
      <div class="">
        <h3>
          <a href="/catatan/{post.slug}" rel="prefetch">{post.title}</a>
        </h3>
        <p>
          <a href="/catatan?category={slugger(post.category)}" rel="prefetch">{post.category}</a>
          :
          {#each post.tags as tag}
            <a href="/catatan?label={slugger(tag)}" rel="prefetch">#{tag}</a> &zwj;
          {/each}
        </p>
        <p>{localDate(post.date)}</p>
        <p>{post.description}</p>
      </div>
    {:else}
      <blockquote>Oops, belum ada catatan tentang itu</blockquote>
    {/each}
  </section>
</div>

<style lang="postcss">
  header {
    @apply text-center;
    & h1 {
      @apply mb-3;
    }
    & p {
      @apply my-3;
    }
  }
  div {
    & h3 {
      @apply mb-2;
    }
    & p {
      @apply my-1;
    }
  }
</style>
