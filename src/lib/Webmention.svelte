<script>
  import { onMount } from 'svelte'
  import { localDate } from './util'
  import marked from 'marked'
  import { page } from '$app/stores'

  let slug
  $: slug = `https://dan.my.id${$page.path}`
  let mentions
  const tweet = `Catatan menarik dari @dansvel : ${slug}`

  onMount(async () => {
    mentions = await fetch(
      `https://webmention.io/api/mentions.jf2?sort-by=published&sort-dir=up&target=${slug}/`
    )
      .then(res => res.json())
      .then(x => {
        const likes = x.children.filter(x => x['wm-property'] === 'like-of')
        const retweets = x.children.filter(x => x['wm-property'] === 'repost-of')
        const replies = x.children.filter(
          x => x['wm-property'] === 'mention-of' || x['wm-property'] === 'in-reply-to'
        )
        return { likes, retweets, replies }
      })
  })
</script>

<div class="prose max-w-none">
  <section>
    <hr />
    <h2>Webmention</h2>
    <p>
      <a
        href="https://twitter.com/intent/tweet/?text={tweet}"
        target="_blank"
        rel="noopener">Cuitkan tentang ini di Twitter</a
      >, itu akan muncul disini.
    </p>
  </section>
</div>

{#await mentions then data}
  {#if data !== undefined}
    {#if !data.likes.length && !data.retweets.length && !data.retweets.length}
      <section>
        <div class="prose max-w-none">
          <blockquote>Jadilah yang pertamax memberi tanggapan.</blockquote>
        </div>
      </section>
    {/if}

    {#if data.likes.length}
      <section>
        <h3>Suka</h3>
        <ul>
          {#each data.likes as like}
            <li>
              <a
                href={like.url}
                target="_blank"
                rel="noopener external"
                title={like.author.name}
              >
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
      </section>
    {/if}

    {#if data.retweets.length}
      <section>
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
      </section>
    {/if}

    {#if data.replies.length}
      <section>
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
              <div class="message max-w-none">
                <div class="meta">
                  <strong>{message.author.name}</strong> -
                  {localDate(message.published, true)}
                </div>
                {@html marked(
                  message.content.html
                    .replace(/u-mention/gm, `u-mention hidden`)
                    .replace(
                      /<a href=\\"https:\/\/(?!dan\.my\.id)/gm,
                      `<a target="_blank" rel="noopener external" href=\\\\"https://`
                    )
                )}
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
    transition: color 0s;
  }
  h3 {
    @apply text-xl font-semibold my-5;
  }
  ul:not(.replies) {
    @apply flex flex-wrap list-none;
    li {
      @apply m-1;
      a {
        @apply text-gray-500 hover:text-gray-500;
        &:hover {
          box-shadow: none;
        }
        img {
          @apply border-2 border-gray-500
          rounded-full;
          &:hover {
            box-shadow: 0 0 5px 2px;
          }
        }
      }
    }
  }
  ul.replies {
    @apply mt-2 divide-y-2 divide-gray-200;
    :global(.dark) & {
      @apply divide-gray-800;
    }
    li {
      @apply py-4 flex flex-row
      duration-500;
      transition-property: border-top-color;
      .avatar {
        @apply w-12 h-auto
        flex flex-grow-0 flex-shrink-0 justify-center;
        a {
          @apply text-gray-500 hover:text-gray-500;
          &:hover {
            box-shadow: none;
          }
        }
        img {
          @apply border-2 border-gray-500
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
    }
  }
</style>
