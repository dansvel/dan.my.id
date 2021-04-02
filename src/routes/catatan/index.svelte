<script context="module">
  import { getUrlParams } from '$lib/util'

  export async function load({ session, page }) {
    const posts = session.posts
    const filter = (await page.query) ? getUrlParams(page.query.toString()) : {}
    return {
      props: {
        posts,
        filter
      }
    }
  }
</script>

<script>
  import { slugger, localDate, arrUnion } from '$lib/util'
  import SeoHead from '$lib/components/SeoHead.svelte'
  import Transition from '$lib/components/Transition.svelte'

  export let posts
  export let filter

  let allTags = arrUnion(posts.map(post => [...post.tags]))
  $: {
    if (filter.label)
      posts = posts.filter(post =>
        post.tags.map(tag => slugger(tag)).includes(filter.label)
      )
    if (filter.kategori)
      posts = posts.filter(post => slugger(post.category) === filter.kategori)
    posts.sort((a, b) => (a.slug < b.slug ? 1 : -1))
  }
</script>

<SeoHead
  title="Catatan Perjalanan - Blog milik Dan"
  description="Tentang Pemrograman yang aku pelajari dan manusia yang aku teliti."
  url="/catatan"
/>

<Transition
  key="Catatan {filter.kategori ? 'mengenai ' + filter.kategori : ''}
        {filter.label ? 'mengenai ' + filter.label : ''} - Blog milik Dan"
>
  <div class="prose lg:prose-lg xl:prose-xl max-w-none">
    <header>
      <h1>
        Catatan {filter.kategori ? 'mengenai ' + filter.kategori : ''}
        {filter.label ? 'mengenai ' + filter.label : ''}
      </h1>
      <p>
        Tentang: <a href="/catatan?kategori=manusia">manusia</a>
        atau
        <a href="/catatan?kategori=teknologi">teknologi</a>
      </p>
      <p>
        Label:
        {#each allTags as tag}
          <a href="/catatan?label={slugger(tag)}">#{tag}</a> &nbsp;
        {/each}
      </p>
    </header>
    <section>
      {#each posts as post}
        <article>
          <h3>
            <a href="/catatan/{post.slug}">{post.title}</a>
          </h3>
          <p>
            <a href="/catatan?kategori={slugger(post.category)}">{post.category}</a>
            :
            {#each post.tags as tag}
              <a href="/catatan?label={slugger(tag)}">#{tag}</a> &zwj;&nbsp;
            {/each}
          </p>
          <p>{localDate(post.date)}</p>
          <p>{post.description}</p>
        </article>
      {:else}
        <blockquote>Oops, belum ada catatan tentang itu</blockquote>
      {/each}
    </section>
  </div>
</Transition>

<style lang="postcss">
  header {
    @apply text-center;
    h1 {
      @apply mb-2;
    }
    p {
      @apply my-1;
    }
  }
  article {
    h3 {
      @apply mb-2;
    }
    p {
      @apply my-1;
    }
  }
</style>
