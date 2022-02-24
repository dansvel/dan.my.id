import { get as getPosts } from '../index'

/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = async ({ params }) => {
  let { tags } = (await getPosts()).body

  return { body: { tags } }
}
