import { getPost, get_posts } from '$lib/server/content'
import { languageTag } from '$paraglide/runtime.js'
import { error } from '@sveltejs/kit'
// import { error } from '@sveltejs/kit'

/** @type {import('../../../../.svelte-kit/types/src/routes').PageLoad} */
export async function load({ params }) {
	const lang = params.lang ?? 'id'

	/** @type {import('$lib/server/content/types.js').Post} */
	const { post, nav } = await getPost(await get_posts(lang), params.slug)

	// console.log(nav)
	if (post) return { post, nav, lang: params.lang ?? 'id' }

	error(404, 'Catatan tidak ditemukan')
}
