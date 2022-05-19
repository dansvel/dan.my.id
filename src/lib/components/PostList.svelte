<script>
  import { localDate } from '$lib/util'
  import { slugging, parseMarkdownLine } from '../util.js'

  export let posts
</script>

<div class="typography">
  {#each posts as post}
    <div class="catatan">
      <h3>
        <a href="/{post.slug}">{@html parseMarkdownLine(post.metadata.title)}</a>
      </h3>
      <p class="metadata">
        <time>{localDate.format(new Date(post.metadata.date))}</time>
        {#each post.metadata.tags as tag}
          <a href="/catatan/label/{slugging(tag)}" class="button">{tag}</a>
        {/each}
      </p>
      <p>{post.metadata.description}</p>
    </div>
  {/each}
</div>

<style lang="postcss">
  div.typography {
    @apply space-y-8 mt-20;

    div.catatan {
      * {
        @apply my-1 first:mt-0 last:mb-0;
      }

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
    }
  }
</style>
