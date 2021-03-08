<script lang="ts">
  let page = 0;
  let url = 'https://daily-dev-tips.com/posts/5-websites-for-color-inspiration';
  let mentions;
  import { onMount } from 'svelte';
  onMount(async () => {
    mentions = await getMentions(url);
  });

  function getMentions(url) {
    return fetch(
      `https://webmention.io/api/mentions.jf2?sort-by=published&page=${page}&per-page=25&target=${url}/`
    )
      .then((res) => res.json())
      .then((x) => {
        const likes = x.children.filter((x) => x['like-of']);
        const retweets = x.children.filter((x) => x['repost-of']);
        const replies = x.children.filter(
          (x) => x['mention-of'] || x['in-reply-to']
        );
        return { likes: likes, retweets: retweets, replies: replies };
      });
  }

  $: if (mentions) {
    console.log('ok', mentions);
  }
</script>

{#await mentions}
  <p>Mencari</p>
{:then data}
  {#if data === undefined}
    <p>gagal mencari</p>
  {:else}
    {#if data.likes}
      <h3>Likes</h3>
      <ul>
        {#each data.likes as like}
          <li>
            <a href={like.url} rel="noopener external" title={like.author.name}>
              {#if like.author.photo}
                <img
                  src={like.author.photo}
                  alt={like.author.name}
                  width="48"
                  height="48"
                  loading="lazy" />
              {:else}
                <img
                  src="/images/default-avatar.png"
                  alt={like.author.name}
                  width="48"
                  height="48"
                  loading="lazy" />
              {/if}
            </a>
          </li>
        {/each}
      </ul>
    {/if}

    {#if data.retweets}
      <h3>Retweets</h3>
      <ul>
        {#each data.retweets as retweet}
          <li>
            <a
              href={retweet.url}
              rel="noopener external"
              title={retweet.author.name}>
              {#if retweet.author.photo}
                <img
                  src={retweet.author.photo}
                  alt={retweet.author.name}
                  width="48"
                  height="48"
                  loading="lazy" />
              {:else}
                <img
                  src="/images/default-avatar.png"
                  alt={retweet.author.name}
                  width="48"
                  height="48"
                  loading="lazy" />
              {/if}
            </a>
          </li>
        {/each}
      </ul>
    {/if}
  {/if}
{/await}

<style lang="postcss">
  h3 {
    @apply text-2xl lg:text-3xl font-bold my-5;
  }
  ul {
    @apply flex flex-wrap list-none;
    & li {
      @apply m-1;
    }
    & img {
      @apply rounded-full;
    }
  }
</style>
