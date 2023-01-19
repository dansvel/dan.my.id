import { getPosts, getTags } from '$lib/content'
import { slugging } from '$lib/util'

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const { posts } = await getPosts({ filterTag: params.tag })
  const tags = await getTags()
  const tag = tags.find((tag) => slugging(tag) === params.tag)
  return { tag, posts, tags }

  // return { status: 404 };
}
