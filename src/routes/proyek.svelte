<script>
  import Page from '$lib/Page.svelte'
  import content from '../../contents/page/proyek.md'
  import Transition from '$lib/Transition.svelte'
</script>

<Transition key="proyek">
  <Page {content} />
</Transition>
