<script>
  import { localDate, slugger } from '$lib/util'

  export let posts = []
  export let title
</script>

<div class="typography">
  {#if title}
    <div></div>
    <h2>{title}</h2>
  {/if}

  {#if posts.length}
    {#each posts as post}
      <article>
        <h4>
          <!--{#if post.draft}-->
          <!--  {post.title}-->
          <!--{:else}-->
            <a href="/catatan/{post.slug}">{post.title}</a>
          <!--{/if}-->
        </h4>

        <p>
          <time datetime={post.date}>{localDate.format(new Date(post.date))}</time>
          <span>
            {#each post.tags.sort() as tag}
              <!--{#if post.draft}-->
              <!--  <span class="disabled-button">{tag}</span>-->
              <!--{:else}-->
                <a href="/catatan/label/{slugger(tag)}" class="button">{tag}</a>
              <!--{/if}-->
            {/each}
          </span>
        </p>
        <p>{post.description}</p>
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
