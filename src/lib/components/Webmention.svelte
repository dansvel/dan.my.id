<script lang="ts">
  import { onMount } from 'svelte';
  import {localDate} from '../util';

  export let url;
  let mentions;
  const tweet= `Catatan menarik dari @dansvel ${url}`

  onMount(async () => {
    mentions = await getMentions();
  });

  function getMentions() {
    return fetch(
            `https://webmention.io/api/mentions.jf2?sort-by=published&target=${url}/`
    )
            .then((res) => res.json())
            .then((x) => {
              const likes = x.children.filter((x) => x['like-of']);
              const retweets = x.children.filter((x) => x['repost-of']);
              const replies = x.children.filter(
                      (x) => x['mention-of'] || x['in-reply-to']
              );
              return { likes, retweets, replies };
            });
  }
</script>

<div class="prose lg:prose-xl max-w-none">
  <section>
    <hr>
    <h2>Webmention</h2>
    <p><a href="https://twitter.com/intent/tweet/?text={tweet}" target="_blank" rel="noopener">Cuitkan sesuatu tentang catatan ini di Twitter</a>, itu akan muncul disini.</p>
  </section>
</div>

{#await mentions then data}
  {#if data !== undefined}
    {#if !data.likes.length  && !data.retweets.length && !data.retweets.length}
      <section>
        <div class="prose lg:prose-xl max-w-none">
        <blockquote>Jadilah yang pertamax memberi tanggapan.</blockquote>
        </div>
      </section>
    {/if}

    {#if data.likes.length }
      <section>
        <h3>Suka</h3>
        <ul>
          {#each data.likes as like}
            <li>
              <a href={like.url} target="_blank" rel="noopener external" title={like.author.name}>
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
      </section>
    {/if}

    {#if data.retweets.length }
      <section>
        <h3>Retweet</h3>
        <ul>
          {#each data.retweets as retweet}
            <li>
              <a
                      target="_blank"
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
      </section>
    {/if}

    {#if data.replies.length }
      <section>
        <h3>Balasan</h3>
        <ul class="replies">
          {#each data.replies as message}
            <li>
              <div class="avatar">
                <a href="{message.url}" target="_blank" rel="noopener external" title="{ message.author.name }">
                  <img src="{ message.author.photo }" alt="{ message.author.name }" width="48" height="48" loading="lazy">
                </a>
              </div>
              <div class="message prose lg:prose-xl max-w-none">
                <strong>{ message.author.name }</strong> - { localDate(message.published, true) }<br>
                {@html message.content.html}
              </div>
            </li>
          {/each}
        </ul>
      </section>
    {/if}

  {/if}
{/await}

<style lang="postcss">
  section {
    @apply mb-10;
  }
  h3 {
    @apply text-2xl lg:text-3xl font-bold my-5;
  }
  ul:not(.replies) {
    @apply flex flex-wrap list-none;
    & li {
      @apply m-1;
    }
    & img {
      @apply rounded-full;
    }
  }
  ul.replies {
    @apply flex-col list-none;
    & li {
      @apply flex m-0 py-2 border-b-2 border-gray-500;
      &:last-child {
        @apply border-none;
      }
      & .avatar {
        @apply flex-shrink-0 self-start mr-4;
        & img {
          @apply rounded-full;
        }
      }
      & .message {
        @apply whitespace-pre-wrap;
      }
    }
  }
</style>