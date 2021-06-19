<script>
  export let posts
  import { localDate, slugger } from '$lib/util'

  export let title
</script>

<section>
  {#if title}
    <h2 class="text-center">{title}</h2>
  {/if}
  {#each posts as post}
    <article>
      <!--      <a href="catatan/{post.slug}">{post.slug}</a>-->
      <div class="thumbnail">
        <img src={post.image} alt="Thumbnail for {post.title}" />
      </div>
      <div class="post">
        <h3><a href="catatan/{post.slug}">{post.title}</a></h3>
        <div class="meta-date">{localDate(post.date)}</div>
        <div>
          {#each post.tags as tag}
            <a href="/catatan?label={slugger(tag)}">#{tag}</a> &nbsp; &nbsp;
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
    @apply mt-2 divide-y-2 divide-gray-200;
    :global(.dark) & {
      @apply divide-gray-800;
    }
    h2 {
      @apply py-4 text-2xl font-bold text-left;
    }
    article {
      @apply py-4 flex flex-col md:flex-row
      duration-500;
      transition-property: border-top-color;
      .thumbnail {
        @apply w-full md:w-32 md:h-auto
          flex flex-grow-0 flex-shrink-0 justify-center;
        img {
          @apply max-h-46 object-cover w-max
            md:object-contain md:object-top;
        }
      }
      .post {
        @apply h-full p-0 md:px-4;
        h3 {
          @apply mt-2 md:mt-0 mb-2 text-xl font-bold;
        }
        .meta-date {
          @apply text-gray-500 text-sm;
        }
        p {
          @apply mt-2 mb-0 text-base;
        }
      }
    }
  }
</style>
