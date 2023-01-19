import { getPosts } from '$lib/content'
import { error } from '@sveltejs/kit'

import { redirect } from '@sveltejs/kit'

/** @type {import('./[pageNum=integer].svelte').load} */
export async function load({ params: { pageNum } }) {
  if (parseInt(pageNum) === 1) throw redirect(301, '/')

  const { posts, more } = await getPosts({ pageNum })

  if (posts.length) return { pageNum, posts, more }

  throw error(404, 'Halaman tidak ada')
}
