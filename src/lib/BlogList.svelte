<script>
  import { localDate, slugger } from '$lib/util'

  export let blogs = []
  export let title
</script>

<div class="typography">
  {#if title}
    <!-- prettier-ignore -->
    <div></div>
    <h2>{title}</h2>
  {/if}

  {#if blogs.length}
    {#each blogs as blog}
      <article>
        <h4>
          <a href="/catatan/{blog.slug}">{blog.title}</a>
        </h4>

        <p>
          <time datetime={blog.date}>{localDate.format(new Date(blog.date))}</time>
          <span>
            {#each blog.tags.sort() as tag}
              <a href="/catatan/label/{slugger(tag)}" class="button">{tag}</a>
            {/each}
          </span>
        </p>
        <p>{blog.description}</p>
      </article>
    {/each}
  {:else}
    <blockquote>Belum ada catatan</blockquote>
  {/if}
</div>

<style lang="postcss">
  div.typography {
    h2 {
      @apply mb-2 border-none;
    }

    article {
      @apply py-2;

      h4 a {
        @apply font-bold my-1;
      }
      p {
        @apply my-1 truncate;
        font-size: 100%;
        @media (min-width: 1024px) {
          font-size: 95%;
        }

        time {
          @apply mr-4;
        }
        span {
          @apply space-x-4;
        }
      }
    }
  }
</style>
