import { get as getPosts } from './catatan/index'
import { postsPerPage } from '$lib/config.js'

export const get = async () => {
  const { posts } = (await getPosts()).body
  const morePosts = posts.length - postsPerPage > 0

  return {
    body: {
      morePosts,
      posts: posts.slice(0, postsPerPage),
    },
  }
}
