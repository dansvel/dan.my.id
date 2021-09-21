<script>
  export let posts;
  import { localDate, slugger } from '$lib/util';

  export let title;
</script>

<section>
  {#if title}
    <h2>{title}</h2>
  {/if}
  {#each posts as post}
    <article>
      <div class="thumbnail">
        <img src={post.image} alt="Thumbnail for {post.title}" />
      </div>
      <div class="post">
        <h3><a sveltekit:prefetch href="catatan/{post.slug}">{post.title}</a></h3>
        <small>{localDate(post.date)}</small>
        <div>
          {#each post.tags as tag}
            <a sveltekit:prefetch href="/catatan?label={slugger(tag)}">#{tag}</a>
            <span class="last:hidden">&nbsp;</span>
          {/each}
        </div>
        <p>{post.description}</p>
      </div>
    </article>
  {:else}
    <blockquote>Oops, belum ada catatan tentang itu</blockquote>
  {/each}
</section>

<style lang="postcss">
  section {
    @apply mt-2 divide-y-2 divide-gray-500;
    h2 {
      @apply text-center my-2 border-0;
    }
    article {
      @apply py-4 flex flex-col md:flex-row;
      .thumbnail {
        @apply w-full md:w-32 md:h-auto
          flex flex-grow-0 flex-shrink-0 justify-center;
        img {
          @apply max-h-46 object-cover w-max
            md:object-contain md:object-top m-0;
        }
      }
      .post {
        @apply h-full p-0 md:px-4;
        h3 {
          @apply mt-2 md:mt-0 mb-2 border-0;
          a {
            @apply border-b hover:(border-b-3)
            text-indigo-700 dark:text-indigo-300
            visible m-0;
          }
        }
        small {
          @apply text-gray-500;
        }
        p {
          @apply mt-2 mb-0;
        }
      }
    }
  }
</style>
