<script>
	import { localDate } from '$lib/util'
	import { translatePath } from '$lib/i18n.js'

	/** @type {Metadata[]} */
	export let posts

	export let lang

	const lists = Object.entries(
		posts.reduce((b, a) => {
			const { date } = a

			const y = date.slice(0, 4)

			if (b.hasOwnProperty(y)) {
				b[y].push(a)
			} else {
				b[y] = [a]
			}
			return b
		}, {})
	).reverse()
</script>

{#each lists as [year, posts] (year)}
	<div class="divider divider-primary text-xl">{year}</div>
	{#each posts as post (post.slug)}
		<div class="typography">
			<li>
				<a href={translatePath(`/${post.slug}`, lang)}>{post.title}</a>
				<hr class="hr-list" />
				<time datetime={post.date}>{localDate(lang).format(new Date(post.date))}</time>
			</li>
		</div>
	{/each}
{/each}

<style lang="postcss">
	.divider {
		margin-top: 3em;
	}
	.typography {
		li {
			align-items: baseline;
			display: flex;

			a {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				text-decoration: none;
				&:hover {
					text-decoration: underline;
				}
			}

			hr.hr-list {
				border: 0;
				border-bottom: 0.2rem dotted;
				flex: 1 0 1rem;
				height: 1px;
				margin: 0 0.5rem;
			}

			time {
				flex-shrink: 0;
			}
		}
	}
</style>
