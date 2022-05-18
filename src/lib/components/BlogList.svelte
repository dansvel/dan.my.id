<script>
  import { localDate } from '$lib/util'
  import { slugging } from '../util.js'

  export let blogs
</script>

<div class="typography">
  {#each blogs as blog}
    <div class="catatan">
      <h3>
        <a href="/{blog.slug}">{blog.metadata.title}</a>
      </h3>
      <p class="metadata">
        <time>{localDate.format(new Date(blog.metadata.date))}</time>
        {#each blog.metadata.tags as tag}
          <a href="/catatan/label/{slugging(tag)}" class="button">{tag}</a>
        {/each}
      </p>
      <p>{blog.metadata.description}</p>
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
