import { arrFlat, slugger } from '$lib/util.js'

export const get = async () => {
  const files = import.meta.globEager('../../content/posts/*.md')
  const posts = []

  for (const path in files) {
    if (path.split('/').pop().match(/\.md$/)) {
      const { metadata } = files[path]
      posts.push({
        slug: path.split('/').pop().slice(0, -3),
        ...metadata,
      })
    }
  }
  let tags = posts.map(post => post.tags)
  tags = [...new Set(arrFlat(tags))]
  tags = tags.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))

  return {
    body: {
      tags,
      posts: posts.sort((a, b) => {
        return new Date(b.date) - new Date(a.date)
      }),
    },
  }
}
