import { get_posts } from '$lib/server/content'

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const lang = params.lang ?? 'id'
	return { posts: await get_posts(lang), lang }
}
