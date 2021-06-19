<script context="module">
  import { capitalize, getUrlParams, slugger } from '$lib/util'

  export async function load({ session, page }) {
    let posts = session.posts
    const filter = (await page.query) ? getUrlParams(page.query.toString()) : {}
    if (filter.label) {
      posts = posts.filter(post =>
        post.tags.map(tag => slugger(tag)).includes(filter.label)
      )
      filter.label = session.slugs.filter(slug => slugger(slug) === filter.label)
    }
    if (filter.kategori) {
      posts = posts.filter(post => slugger(post.category) === filter.kategori)
      filter.kategori = capitalize(filter.kategori)
    }

    let hal = parseInt(filter?.hal || 1)
    const per = 9
    let more = posts.length - hal * per <= 0
    posts = posts.slice(hal * per - per, hal * per)
    return {
      props: {
        posts,
        filter,
        more
      }
    }
  }
</script>

<script>
  import { session } from '$app/stores'
  import { urlParamsToQuery } from '$lib/util'
  import CatatanList from '$lib/CatatanList.svelte'
  import { fade } from 'svelte/transition'
  import Transition from '$lib/Transition.svelte'

  export let posts, filter, more

  const allTags = $session.slugs

  let hal, navurl
  $: {
    hal = parseInt(filter?.hal || 1)
    delete filter.hal
  }

  $: navurl =
    '?' + urlParamsToQuery(filter) + (Object.keys(filter).length ? '&' : '') + 'hal='
</script>

<Transition key="catatan">
  <header class="prose max-w-none">
    <h1>
      Catatan
      {#key filter}
        {JSON.stringify(filter) !== '{}'
          ? 'tentang ' + (filter?.label || filter?.kategori)
          : ''}
      {/key}
    </h1>
    <div class="text-center">
      Kategori :
      <a href="/catatan?kategori=manusia" sveltekit:noscroll>Manusia</a>
      <a href="/catatan?kategori=teknologi" sveltekit:noscroll>Teknologi</a>
    </div>
    <div>
      <div class="text-center">
        Label :
        {#each allTags as tag}
          <a href="/catatan?label={slugger(tag)}" sveltekit:noscroll>#{tag}</a><span
            class="last:hidden"
          >
            &nbsp; &nbsp;</span
          >
        {/each}
      </div>
    </div>
  </header>

  {#key posts}
    <div in:fade={{ duration: 500, delay: 550 }} out:fade={{ duration: 500 }}>
      <CatatanList {posts} />
    </div>
  {/key}
  <div class="flex">
    <a href={navurl + (hal - 1)} class:hidden={hal <= 1}>Lebih baru</a>
    <a href={navurl + (hal + 1)} class="ml-auto" class:hidden={more}>Lebih lawas</a>
  </div>
</Transition>

<style lang="postcss">
  header {
    @apply py-4;
    h1 {
      @apply my-2 text-center;
    }
  }
</style>