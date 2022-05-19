<script context="module">
  import { getPost } from '$lib/content'

  /** @type {import('./[slug].svelte').load} */
  export const load = async ({ params }) => {
    const content = await getPost(params.slug)
    if (content) return { props: { content } }
    return { status: 404 }
  }
</script>

<script>
  import Webmention from '$lib/components/Webmention.svelte'
  import { localDate, slugging, parseMarkdownLine } from '$lib/util'
  import SeoHead from '$lib/components/SeoHead.svelte'

  export let content
</script>

<SeoHead
  title={content.metadata.title}
  description={content.metadata.description}
  keywords={content.metadata.tags.join(', ')}
/>

<div class="typography">
  <h1>{@html parseMarkdownLine(content.metadata.title)}</h1>
  <p class="metadata">
    <time>{localDate.format(new Date(content.metadata.date))}</time>
    {#each content.metadata.tags as tag}
      <a href="/catatan/label/{slugging(tag)}" class="button">{tag}</a>
    {/each}
  </p>
  <svelte:component this={content.default} />
</div>

<nav>
  {#if content.prev}
    <a sveltekit:prefetch href="/{content.prev.slug}" class="button" id="prev">
      <span class="mark">&laquo;</span>
      <span>{content.prev.metadata.title}</span>
    </a>
  {/if}
  {#if content.next}
    <a sveltekit:prefetch href="/{content.next.slug}" class="button" id="next">
      <span>{content.next?.metadata.title}</span>
      <span class="mark">&raquo;</span>
    </a>
  {/if}
</nav>

<Webmention slug="catatan/{content.slug}" />

<style lang="postcss">
  p {
    @apply truncate;
    &.metadata {
      time {
        @apply mr-5;
      }
      a {
        @apply mr-3;
      }
    }
  }

  nav {
    @apply flex flex-col mt-16 space-y-4;
    a {
      @apply flex flex-1 text-center px-6 space-x-5 overflow-x-hidden truncate;
      span:not(.mark) {
        @apply overflow-x-hidden;
      }
    }
    #prev {
      @apply justify-start;
      border-radius: 9999px 0 0 9999px;
    }
    #next {
      @apply justify-end;
      border-radius: 0 9999px 9999px 0;
    }
  }
</style>
