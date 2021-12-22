<script>
  import { localDate } from '$lib/util'

  export let blogs = []
</script>

<section>
  {#each blogs as blog}
    <article>
      <div>
        <p>
          {#if blog.draft}
            {blog.title}
          {:else}
            <a href="/{blog.url}">{blog.title}</a>
          {/if}
        </p>
        <time datetime={blog.date}>{localDate(blog.date)}</time>
      </div>

      <!--      <p>-->
      <!--        <small-->
      <!--          >Label: {#each blog.tags.split(', ') as tag}<span>#{tag}</span> {/each}</small-->
      <!--        >-->
      <!--      </p>-->
      <p>{blog.description}</p>
    </article>
  {/each}
</section>

<style lang="postcss">
  section {
    @apply divide-y-2 divide-gray-200 dark:divide-gray-800;
    h2 {
      @apply text-center my-2 border-0;
    }
    article {
      @apply py-2 h-full;
      div {
        @apply flex items-center justify-between;
        p {
          @apply font-bold;
        }
        time {
          @apply flex-shrink-0 ml-3 font-bold;
        }
      }
      p {
        @apply my-1 truncate;
      }
    }
  }
</style>
