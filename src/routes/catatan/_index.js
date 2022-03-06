import { arrFlat } from '$lib/util'

export const get = async () => {
  const files = import.meta.glob('../../content/blogs/*.md')

  let blogs = []
  for (const path in files) {
    const { metadata } = await files[path]()
    if (!metadata.draft)
      blogs.push({
        slug: path.split('/').pop().slice(0, -3),
        ...metadata,
      })
  }

  let tags = blogs.map(blog => blog.tags)
  tags = [...new Set(arrFlat(tags))]
  tags = tags.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))

  return {
    // body: {
    tags,
    blogs: blogs.sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    }),
    // },
  }
}
