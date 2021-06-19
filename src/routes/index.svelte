<script>
  import { session } from '$app/stores'
  import content from '../../contents/page/index.md'
  import CatatanList from '$lib/CatatanList.svelte'
  import { randomItems } from '$lib/util'
  import Transition from '$lib/Transition.svelte'

  const posts = randomItems($session.posts, 3)
</script>

<Transition key="index">
  <div class="prose max-w-none">
    <h1 class="text-center my-4">{content.title}</h1>
    <h2 class="text-center my-4">{content.subtitle}</h2>
    {@html content.body}
  </div>

  <CatatanList {posts} title="Beberapa catatan menarik" />
  <a href="/catatan" class="float-right">Lebih banyak catatan</a>
</Transition>
