import { get as getPosts } from '../../index'
import { postsPerPage } from '$lib/config.js'
import { arrFlat, slugger } from '$lib/util.js'

/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = async ({ params }) => {
  if (!params.n.match(/^\d+$/)) return { status: 404 }

  let { posts, tags } = (await getPosts()).body

  posts = posts.filter(post => post.tags.map(tag => slugger(tag)).includes(params.tag))

  const morePosts = posts.length - params.n * postsPerPage > 0

  posts = posts.slice(params.n * postsPerPage - postsPerPage, params.n * postsPerPage)

  if (posts.length)
    return {
      body: { morePosts, posts, tags },
    }

  return { status: 404 }
}
