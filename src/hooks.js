import { arrSortBy } from '$lib/util'

export async function getSession() {
  const posts = await Promise.all(
    Object.entries(import.meta.glob('/contents/post/*.md')).map(async ([path, page]) => {
      const { default: post } = await page()
      const { body, image, ...attributes } = post
      const slug = path.split('/').pop().split('.').shift()
      return { slug, ...attributes }
    })
  )

  return {
    posts: arrSortBy(posts, 'slug', false)
  }
}
