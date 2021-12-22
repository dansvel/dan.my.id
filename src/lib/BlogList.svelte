<script>
  import { localDate } from '$lib/util'

  export let blogs = []
</script>

<section>
  {#each blogs as blog}
    <article>
      <h3>
        {#if blog.draft}
          {blog.title}
        {:else}
          <a href="/{blog.url}">{blog.title}</a>
        {/if}
      </h3>
      <p>
        <small
          >Label: {#each blog.tags.split(', ') as tag}<span>#{tag}</span> {/each}</small
        >
      </p>
      <p>{blog.description}</p>
    </article>
  {/each}
</section>

<style lang="postcss">
  section {
    @apply mt-2 divide-y-2 divide-gray-200 dark:divide-gray-800;
    h2 {
      @apply text-center my-2 border-0;
    }
    article {
      @apply py-4 h-full;
      h3 {
        @apply mt-2 md:mt-0 mb-2 border-0 leading-relaxed;
        a {
          @apply border-b hover:(border-b-3)
            text-indigo-700 dark:text-indigo-300
            visible m-0;
        }
      }
      small {
        @apply text-gray-600 dark:text-gray-400;
        span {
          @apply bg-gray-200 dark:bg-gray-800 px-1;
        }
      }
      p {
        @apply my-1 mb-0;
      }
    }
  }
</style>
