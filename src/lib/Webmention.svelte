<script>
  import { onMount } from 'svelte';
  import { localDate } from './util';
  import { page } from '$app/stores';

  let target, mentions, tweet;
  $: {
    target = `https://dan.my.id${$page.path}`;
    tweet = `Catatan menarik dari @dansvel ${target}`;
  }

  onMount(async () => {
    mentions = await fetch(
      `https://webmention.io/api/mentions.jf2?sort-by=published&sort-dir=up&target=${target}/`
    )
      .then((res) => res.json())
      .then((x) => {
        const likes = x.children.filter((x) => x['wm-property'] === 'like-of');
        const retweets = x.children.filter((x) => x['wm-property'] === 'repost-of');
        const replies = x.children.filter(
          (x) => x['wm-property'] === 'mention-of' || x['wm-property'] === 'in-reply-to'
        );
        return { likes, retweets, replies };
      });
  });
</script>

<section>
  <h2>Webmention, menanggapi dengan ❤️</h2>
  <p>
    Ingin bertanya atau menanggapi?
    <a href="https://twitter.com/intent/tweet/?text={tweet}" target="_blank" rel="noopener"
      >Cuitkan di Twitter</a
    >, itu akan muncul disini.
  </p>
  <pre>
    <a href="/catatan/6-komentar-blog-statis-dengan-webmention">
      <code>Apa itu Webmention?</code>
    </a>
  </pre>

  {#await mentions then data}
    {#if data !== undefined}
      {#if !data.likes.length && !data.retweets.length && !data.replies.length}
        <blockquote>Jadilah yang pertamax memberi tanggapan.</blockquote>
      {/if}

      {#if data.likes.length}
        <h3>Suka</h3>
        <ul>
          {#each data.likes as like}
            <li>
              <a href={like.url} target="_blank" rel="noopener external" title={like.author.name}>
                <img
                  src={like.author.photo ?? '/images/default-avatar.png'}
                  alt={like.author.name}
                  width="48"
                  height="48"
                  loading="lazy"
                />
              </a>
            </li>
          {/each}
        </ul>
      {/if}

      {#if data.retweets.length}
        <h3>Retweet</h3>
        <ul>
          {#each data.retweets as retweet}
            <li>
              <a
                target="_blank"
                href={retweet.url}
                rel="noopener external"
                title={retweet.author.name}
              >
                <img
                  src={retweet.author.photo ?? '/images/default-avatar.png'}
                  alt={retweet.author.name}
                  width="48"
                  height="48"
                  loading="lazy"
                />
              </a>
            </li>
          {/each}
        </ul>
      {/if}

      {#if data.replies.length}
        <h3>Balasan</h3>
        <ul class="replies">
          {#each data.replies as message}
            <li>
              <div class="avatar">
                <a
                  href={message.url}
                  target="_blank"
                  rel="noopener external"
                  title={message.author.name}
                >
                  <img
                    src={message.author.photo ?? '/images/default-avatar.png'}
                    alt={message.author.name}
                    width="48"
                    height="48"
                    loading="lazy"
                  />
                </a>
              </div>
              <div class="message">
                <div class="meta">
                  <strong
                    >{message.author.name}
                    <span>@{message.author.url.replace(/https:\/\/twitter.com\//i, '')}</span>
                  </strong>
                  <small>{localDate(message.published, true)}</small>
                </div>
                {@html message.content.html
                  .replace(/\n<a class="u-mention".+><\/a>/gim, '')
                  .replace(
                    /<a href=\\"https:\/\/(?!dan\.my\.id)/gim,
                    '<a target="_blank" rel="noopener external" href="https://'
                  )
                  .replace(/\n/gim, '<br />')}
              </div>
            </li>
          {/each}
        </ul>
      {/if}
    {/if}
  {/await}
</section>

<style lang="postcss">
  section {
    @apply mb-5 border-t-2 border-gray-500;
  }

  ul:not(.replies) {
    @apply flex flex-wrap list-none p-0;
    li {
      @apply m-1;
      a {
        @apply text-gray-500 no-underline border-0;
        img {
          @apply border-b border-gray-500 m-0
          rounded-full;
          &:hover {
            box-shadow: 0 0 5px 2px;
          }
        }
      }
    }
  }
  ul.replies {
    @apply mt-2 p-0;
    li {
      @apply py-2 flex flex-row;
      .avatar {
        @apply w-12 h-auto
        flex flex-grow-0 flex-shrink-0 justify-center;
        a {
          @apply text-gray-500 no-underline border-0;
        }
        img {
          @apply border-2 border-gray-500 m-0
          rounded-full w-max object-contain object-top;
          &:hover {
            box-shadow: 0 0 5px 2px;
          }
        }
      }
      .message {
        @apply h-full px-4;
        p {
          @apply mt-2 mb-0 text-base;
        }
      }
      .meta {
        span,
        small {
          @apply text-gray-500;
        }
      }
    }
  }
</style>
