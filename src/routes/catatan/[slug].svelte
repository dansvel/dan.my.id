<script context="module">
  export async function load({ page, session }) {
    const slug = page.params.slug
    const slugs = session.posts.map(page => page.slug.match(/^(\d+-[a-z-]+)$/)[1])

    if (!slugs.includes(slug)) {
      return {
        status: 404,
        error: 'Catatan seperti itu tidak ada'
      }
    }

    const posts = await import.meta.glob('../../../contents/post/*.md')

    let post
    for (const path in posts) {
      if (slug === path.split('/').pop().split('.').shift()) {
        post = await posts[path]()
        post = { slug, ...post.default }
      }
    }

    return {
      props: {
        post
      }
    }
  }
</script>

<script>
  import { localDate, slugger } from '$lib/util'
  import SeoHead from '$lib/components/SeoHead.svelte'
  import Webmention from '$lib/components/Webmention.svelte'
  import Transition from '$lib/components/Transition.svelte'

  export let post
</script>

<SeoHead
  title="{post.title} - Blog milik Dan"
  description={post.description}
  image={post.image}
  tags={post.tags}
  url="/catatan/{post.slug}"
/>

<Transition key={post.slug}>
  <div class="prose lg:prose-lg xl:prose-xl max-w-none">
    <article>
      <header>
        <h1>{post.title}</h1>
        <p>
          <a href="/catatan?category={slugger(post.category)}">
            {post.category}
          </a>
          :
          {#each post.tags as tag}
            <a href="/catatan?label={slugger(tag)}">#{tag}</a> &zwj;&nbsp;
          {/each}
        </p>
        <p>{localDate(post.date)}</p>
      </header>
      {@html post.body}
    </article>
  </div>
  <footer>
    <Webmention slug="catatan/{post.slug}" />
  </footer>
</Transition>

<style lang="postcss">
  article {
    h1 {
      @apply text-center mb-2;
    }
    p {
      @apply my-1;
    }
  }
  footer {
    @apply mt-16;
  }
</style>
