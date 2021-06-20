import { arrSortBy, arrUnion } from '$lib/util'

export const getSession = async () => {
  const posts = await Promise.all(
    Object.entries(import.meta.glob('/contents/post/*.md')).map(async ([path, page]) => {
      const { default: post } = await page()
      const { body, ...attributes } = post
      const slug = path.split('/').pop().split('.').shift()
      return { slug, ...attributes }
    })
  )

  return {
    posts: arrSortBy(posts, 'slug', {asc: false, natural: true}),
    slugs: arrUnion(posts.map(post => [...post.tags])).sort()
  }
}
