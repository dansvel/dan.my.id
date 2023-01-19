import { getPosts } from '$lib/content'

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const { posts, more } = await getPosts({ pageNumber: 1 })

  return { posts, more }
}
