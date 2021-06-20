<script>
  import { session } from '$app/stores'
  import content from '../../contents/page/index.md'
  import CatatanList from '$lib/CatatanList.svelte'
  import { randomItems } from '$lib/util'
  import Transition from '$lib/Transition.svelte'
  import SeoHead from '$lib/SeoHead.svelte'

  const posts = randomItems($session.posts, 3)
</script>

<SeoHead />
<Transition key="index">
  <header class="prose max-w-none">
    <h1>{content.title}</h1>
    <h2>{content.subtitle}</h2>
    {@html content.body}
  </header>

  <CatatanList {posts} title="Beberapa catatan menarik" />
  <a href="/catatan" class="float-right">Lebih banyak catatan</a>
</Transition>

<style lang="postcss">
  header {
    @apply py-4;
    h1,
    h2 {
      @apply my-2 text-center;
    }
  }
</style>
