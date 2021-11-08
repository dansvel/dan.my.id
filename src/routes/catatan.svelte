<script context="module">
  export const ssr = false
  import { capitalize, slugger, urlParamsToQuery, getUrlParams } from '$lib/util'

  export async function load({ page: { query }, session: { notes, tags } }) {
    let allPosts

    let filter = query ? getUrlParams(query.toString()) : {}
    if (filter.label) {
      allPosts = notes.filter(note =>
        note.tags.map(tag => slugger(tag)).includes(filter.label)
      )
    } else if (filter.kategori) {
      allPosts = notes.filter(note => slugger(note.category) === filter.kategori)
    } else {
      allPosts = notes
    }

    const per = 9
    delete filter.hal
    const pageNum = parseInt(filter?.hal || 1)

    return {
      props: {
        allTags: tags,
        more: allPosts.length - pageNum * per <= 0,
        notes: allPosts.slice(pageNum * per - per, pageNum * per),
        filter,
        navurl:
          '?' +
          urlParamsToQuery(filter) +
          (Object.keys(filter).length ? '&' : '') +
          'hal=',
        pageNum
      }
    }
  }
</script>

<script>
  import CatatanList from '$lib/CatatanList.svelte'
  import SeoHead from '$lib/SeoHead.svelte'

  export let allTags = []
  export let notes = []
  export let filter = []
  export let navurl = ''
  export let more = false
  export let pageNum = 1
</script>

<SeoHead
  title="Catatan perjalanan setengah manusia"
  description="Tentang manusia yang ku amati dan teknologi yang ku pelajari"
/>

<header>
  <h1>
    Catatan
    {#if JSON.stringify(filter) !== '{}'}
      tentang
      {filter.label ? allTags.filter(slug => slugger(slug) === filter.label) : ''}
      {filter.kategori ? capitalize(filter?.kategori) : ''}
    {/if}
  </h1>
  <div class="text-center">
    Kategori :
    <a href="/catatan?kategori=manusia">Manusia</a>
    <a href="/catatan?kategori=teknologi">Teknologi</a>
  </div>
  <div>
    <div class="text-center">
      Label :
      {#each allTags as tag}
        <a href="/catatan?label={slugger(tag)}">#{tag}</a>
        <span class="last:hidden">&nbsp;</span>
      {/each}
    </div>
  </div>
</header>

<CatatanList {notes} />
<div class="flex">
  <a href={navurl + (pageNum - 1)} class:hidden={pageNum <= 1}>Lebih baru</a>
  <a href={navurl + (pageNum + 1)} class="ml-auto" class:hidden={more}>Lebih lawas</a>
</div>

<style lang="postcss">
  header {
    @apply py-4 border-b-2 border-gray-500;

    h1 {
      @apply my-2 text-center;
    }
  }
</style>
