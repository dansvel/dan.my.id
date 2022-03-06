import { arrFlat } from '$lib/util'

export const get = async () => {
  const files = import.meta.glob('../../content/posts/*.md')

  let posts = []
  for (const path in files) {
    const { metadata } = await files[path]()
    if (!metadata.draft)
      posts.push({
        slug: path.split('/').pop().slice(0, -3),
        ...metadata,
      })
  }

  let tags = posts.map(post => post.tags)
  tags = [...new Set(arrFlat(tags))]
  tags = tags.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))

  return {
    // body: {
    tags,
    posts: posts.sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    }),
    // },
  }
}
