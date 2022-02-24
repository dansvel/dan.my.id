import { get as getPosts } from './index'
import { postsPerPage } from '$lib/config.js'

/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = async ({ params }) => {
  if (!params.n.match(/^\d+$/)) return { fallthrough: true }

  if (parseInt(params.n) === 1)
    return {
      headers: {
        location: '/',
      },
      status: 301,
    }

  let { posts, tags } = (await getPosts()).body

  const morePosts = posts.length - params.n * postsPerPage > 0
  posts = posts.slice(params.n * postsPerPage - postsPerPage, params.n * postsPerPage)

  if (posts.length)
    return {
      body: { morePosts, posts, tags },
    }

  return { status: 404 }
}
