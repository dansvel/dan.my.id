import { get_posts } from '$lib/server/content/index'
import { pick } from '@fastkit/accept-language'

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const lang = params.lang ?? 'id'
	return { posts: await get_posts(lang), lang }
}
