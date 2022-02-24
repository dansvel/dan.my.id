<script>
  import { onMount } from 'svelte'
  import { localDateTime } from './util'
  import { page } from '$app/stores'

  let target, mentions, tweet
  $: {
    console.log($page.url.pathname)
    target = `https://dan.my.id${$page.url.pathname}`
    tweet = `%0A%0ACatatan menarik dari @dansvel ${target}`
  }

  onMount(() => {
    mentions = fetch(
      `https://webmention.io/api/mentions.jf2?sort-by=published&sort-dir=up&target=${target}/`
    )
      .then(res => res.json())
      .then(wms => {
        const likes = wms.children.filter(wm => wm['wm-property'] === 'like-of')
        const retweets = wms.children.filter(wm => wm['wm-property'] === 'repost-of')
        const replies = wms.children.filter(
          wm => wm['wm-property'] === 'mention-of' || wm['wm-property'] === 'in-reply-to'
        )
        const tweetId = wms.children
          .find(x => x['wm-property'] === 'like-of')
          ?.url.match(/[0-9]+/)[0]
        console.log('tweetId ', tweetId)
        return { likes, retweets, replies, tweetId }
      })
  })
</script>

<section class="typography">
  <!-- prettier-ignore -->
  <div></div>
  <h2>Beri tanggapan</h2>

  {#await mentions}
    <blockquote>loading...</blockquote>
  {:then data}
    {#if data !== undefined}
      <blockquote>
        {#if !data.likes.length && !data.retweets.length && !data.replies.length}
          <p>
            Jadilah yang pertamax
            <a
              href="https://twitter.com/intent/tweet/?text={tweet}"
              rel="noopener external"
              class="button"
            >
              memberi tanggapan
            </a>
          </p>
        {/if}

        {#if data.tweetId}
          <p>
            Retweet, beri ❤️, atau balas langsung di
            <a
              href="https://twitter.com/dansvel/status/{data.tweetId}"
              rel="noopener external"
              class="button"
            >
              Tweet-ku
            </a>
          </p>
          <p>
            Atau sekedar
            <a
              href="https://twitter.com/intent/tweet/?text={tweet}"
              rel="noopener external"
              class="button"
            >
              beri komentar
            </a>
          </p>
        {/if}
      </blockquote>

      {#if data.likes.length}
        <h3>Suka</h3>
        <ul id="likes">
          {#each data.likes as like}
            <li>
              <a href={like.url} rel="noopener external" title={like.author.name} class="avatar">
                <img
                  src={like.author.photo ?? '/images/default-avatar.png'}
                  alt={like.author.name}
                  loading="lazy"
                />
              </a>
            </li>
          {/each}
        </ul>
      {/if}

      {#if data.retweets.length}
        <h3>Retweet</h3>
        <ul id="retweets">
          {#each data.retweets as retweet}
            <li>
              <a
                href={retweet.url}
                rel="noopener external"
                title={retweet.author.name}
                class="avatar"
              >
                <img
                  src={retweet.author.photo ?? '/images/default-avatar.png'}
                  alt={retweet.author.name}
                  loading="lazy"
                />
              </a>
            </li>
          {/each}
        </ul>
      {/if}

      {#if data.replies.length}
        <h3>Balasan</h3>
        <ul id="replies">
          {#each data.replies as message}
            <li>
              <a
                href={message.url}
                rel="noopener external"
                class="avatar"
                title={message.author.name}
              >
                <img
                  src={message.author.photo ?? '/images/default-avatar.png'}
                  alt={message.author.name}
                  loading="lazy"
                />
              </a>
              <div class="message">
                <p class="meta">
                  {message.author.name}
                  <strong>
                    @{message.author.url.replace(/https:\/\/twitter.com\//i, '')}
                  </strong>
                  <time>{localDateTime.format(new Date(message.published))}</time>
                </p>
                {@html message.content.html
                  .replace(/\n<a class="u-mention".+><\/a>/gim, '')
                  .replace(
                    /<a href=\\"https:\/\/(?!dan\.my\.id)/gim,
                    '<a rel="noopener external" href="https://'
                  )
                  .replace(/\n/gim, '<br />')}
              </div>
            </li>
          {/each}
        </ul>
      {/if}
    {/if}
  {:catch error}
    <blockquote>
      <p>
        Oops, sepertinya kamu sedang luring. Jangan lupa
        <a
          href="https://twitter.com/intent/tweet/?text={tweet}"
          rel="noopener external"
          class="button"
        >
          beri komentar
        </a> jika koneksi internetmu kembali.
      </p>
    </blockquote>
  {/await}
</section>

<style lang="postcss">
  a.button {
    @apply mx-1 bg-light-700 dark:bg-dark-300;
  }
  section {
    @apply border-t-2 border-light-900 dark:border-dark-100;
  }

  .avatar {
    @apply rounded-full w-12 h-12 ring-offset-2 ring-2 ring-offset-dark-500 ring-lightgreen;
    @apply hover:ring-4;
    img {
      @apply rounded-full m-0;
    }
  }

  ul {
    li {
      @apply p-0;
      &::before {
        content: none;
      }
    }
    &#likes,
    &#retweets {
      @apply flex flex-wrap;
      li {
        @apply flex -mr-3 my-2;
      }
      a {
        @apply m-0 shadow-none;
      }
    }
    &#replies {
      @apply flex flex-col space-y-6;
      li {
        @apply flex space-x-8;
        .avatar {
          @apply mt-4 ml-2 w-12 flex-shrink-0;
        }
        .message {
          @apply m-0 w-full;
          .meta {
            @apply m-0;
          }
        }
      }
    }
  }
</style>
