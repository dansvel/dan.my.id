<script>
	import { onMount } from 'svelte';
	import { localDate } from './util';
	import marked from 'marked';
	import { page } from '$app/stores';

	let slug, mentions, tweet;
	$: {
		slug = `https://dan.my.id${$page.path}`;
		tweet = `Catatan menarik dari @dansvel ${slug}`;
	}

	onMount(async () => {
		mentions = await fetch(
			`https://webmention.io/api/mentions.jf2?sort-by=published&sort-dir=up&target=${slug}/`
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
	<h2>Webmention</h2>
	<p>
		Ingin bertanya atau menanggapi?
		<a href="https://twitter.com/intent/tweet/?text={tweet}" target="_blank" rel="noopener"
			>Cuitkan di Twitter</a
		>, itu akan muncul disini.
	</p>
</section>

{#await mentions then data}
	{#if data !== undefined}
		{#if !data.likes.length && !data.retweets.length && !data.replies.length}
			<blockquote>Jadilah yang pertamax memberi tanggapan.</blockquote>
		{/if}

		{#if data.likes.length}
			<section>
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
		@apply mb-5 pt-5 border-t-2 border-gray-500;
	}
	h2,
	h3 {
		@apply my-4 border-0;
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
		@apply mt-2 divide-y-1 divide-gray-500 p-0;
		li {
			@apply py-4 flex flex-row
      duration-500;
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
		}
	}
</style>
