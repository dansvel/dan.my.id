import { arrFlat, slugging, strCompareByHuman } from './util.js'
import config from '$lib/config.yaml'
import { dev } from '$app/environment'

const { pageSize } = config
// const pageSize = 13

export const getPages = async () => {
  const files = import.meta.glob('../content/pages/**.md')
  let pages = Object.entries(files).map(async ([path, content]) => {
    return {
      slug: path.split('/').pop().slice(0, -3),
      metadata: (await content()).metadata,
    }
  })
  return await Promise.all(pages)
}

export const getPage = async (slug) => {
  try {
    return { slug, ...(await import(`../content/pages/${slug}.md`)) }
  } catch (e) {
    return null
  }
}

export const getPosts = async ({ filterTag = '', pageNum = 0 } = {}) => {
  if (typeof pageNum !== 'number' && pageNum < 0) return []

  const files = import.meta.glob('../content/posts/**.md')
  let posts = Object.entries(files).map(async ([path, content]) => {
    return {
      slug: 'catatan/' + path.split('/').pop().slice(0, -3),
      metadata: (await content()).metadata,
    }
  })

  posts = await Promise.all(posts).then((r) =>
    r.sort((a, b) => new Date(b.metadata.date) - new Date(a.metadata.date))
  )

  if (!dev) posts = posts.filter((post) => new Date(post.metadata.date) <= new Date())

  if (filterTag)
    return { posts: posts.filter((post) => post.metadata.tags.map(slugging).includes(filterTag)) }

  if (pageNum === 0 || pageSize === 0) return { posts }

  const more = posts.length - pageNum * pageSize > 0
  return {
    posts: posts.slice(pageNum * pageSize - pageSize, pageNum * pageSize),
    more,
  }
}

export const getPost = async (slug) => {
  const { posts } = await getPosts()
  const index = posts.findIndex((post) => post.slug === 'catatan/' + slug)

  try {
    return {
      slug,
      ...(await import(`../content/posts/${slug}.md`)),
      prev: posts[index - 1] || null,
      next: posts[index + 1] || null,
    }
  } catch (e) {
    return null
  }
}

export const getTags = async () => {
  const { posts } = await getPosts()
  // console.log(posts)
  let tags = [...new Set(arrFlat(posts.map((post) => post.metadata.tags)))]
  return tags.sort(strCompareByHuman)
}
