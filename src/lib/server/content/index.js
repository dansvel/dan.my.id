import { readdir } from 'node:fs/promises'

const FILENAME_REGEX = String.raw`^(\d{4}-\d{2}-\d{2})-(id|en)-(.+)\.md$`

/**
 * @return {Promise<import('./types.js').Post[]>}
 * @param lang
 */
export const get_posts = async (lang = 'id') => {
	const files = await readdir('content')

	/** @type {import('./types.js').Post[]} */
	const posts = []
	for (const filename of files.reverse()) {
		if (!new RegExp(FILENAME_REGEX.replace('id|en', lang)).test(filename)) continue

		/** @type {{metadata: {title: string, description: string}, default: Function}} */
		const post = await import(`../../../../content/${filename.slice(0, -3)}.md`)

		const { date, slug } = get_date_and_slug(filename)

		posts.push({ ...post.metadata, date, slug, content: post.default.render().html })
	}
	return posts
}

/**
 * @return {Promise<{next: (*|null), post: (*|null), prev: (*|null)}>}
 * @param posts
 * @param slug
 */
export const getPost = async (posts, slug) => {
	const index = posts.findIndex(post => post.slug === slug)

	return {
		post: posts.filter(post => post.slug === slug)[0] || null,
		nav: { prev: posts[index - 1] || null, next: posts[index + 1] || null }
	}
}

/** @param {string} filename */
function get_date_and_slug(filename) {
	const match = new RegExp(FILENAME_REGEX).exec(filename)
	if (!match) throw new Error(`Invalid filename for blog: '${filename}'`)
	const [, date, , slug] = match
	return { date, slug }
}
