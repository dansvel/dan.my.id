<script>
  import Webmention from '$component/Webmention.svelte'
  import { localDate, slugging, parseMarkdownLine } from '$lib/util'
  import SeoHead from '$component/SeoHead.svelte'

  export let data
</script>

<SeoHead
  title={data.content.metadata.title}
  description={data.content.metadata.description}
  keywords={data.content.metadata.tags.join(', ')}
/>

<article>
  <header class="typography">
    <h1>{@html parseMarkdownLine(data.content.metadata.title)}</h1>
    <p class="metadata">
      <time>{localDate.format(new Date(data.content.metadata.date))}</time>&nbsp;
    </p>
  </header>
  <div class="my-4">
    {#each data.content.metadata.tags as tag}
      <a href="/catatan/label/{slugging(tag)}" class="btn  btn-sm normal-case">{tag}</a>&nbsp;
    {/each}
  </div>
  <div class="typography">
    <svelte:component this={data.content.default} />
  </div>
</article>

<nav>
  {#if data.content.prev}
    <a sveltekit:prefetch href="/{data.content.prev.slug}" class="btn  btn-sm" id="prev">
      <span class="mark">&laquo;</span>
      <span>{data.content.prev.metadata.title}</span>
    </a>
  {/if}
  {#if data.content.next}
    <a
      sveltekit:prefetch
      href="/{data.content.next.slug}"
      class="btn btn-sm inline-block"
      id="next"
    >
      <span>{data.content.next?.metadata.title}</span>
      <span class="mark">&raquo;</span>
    </a>
  {/if}
</nav>

<Webmention slug="catatan/{data.content.slug}" />

<style lang="postcss">
  nav {
    @apply flex flex-col mt-16 space-y-4;
    a {
      @apply flex flex-1 text-center px-6 space-x-5 overflow-hidden truncate normal-case;

      span:not(.mark) {
        @apply overflow-hidden;
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
