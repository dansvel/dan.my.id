import { arrFlat, slugging, strCompareByHuman } from './util.js'
import config from '$lib/config.yaml'

const { pageSize } = config

export const getPages = async () => {
  const files = await import.meta.glob('../content/pages/**.md')
  let pages = Object.entries(files).map(async ([path, content]) => {
    return {
      slug: path.split('/').pop().slice(0, -3),
      metadata: (await content()).metadata,
    }
  })
  return await Promise.all(pages)
}

export const getPage = async slug => {
  try {
    return { slug, ...(await import(`../content/pages/${slug}.md`)) }
  } catch (e) {
    return null
  }
}

export const getBlogs = async ({ filterTag = '', pageNumber = 0 } = {}) => {
  if (typeof pageNumber !== 'number' && pageNumber < 0) return []

  const files = await import.meta.glob('../content/blogs/**.md')
  let blogs = Object.entries(files).map(async ([path, content]) => {
    return {
      slug: 'catatan/' + path.split('/').pop().slice(0, -3),
      metadata: (await content()).metadata,
    }
  })

  blogs = await Promise.all(blogs).then(r =>
    r.sort((a, b) => new Date(b.metadata.date) - new Date(a.metadata.date))
  )

  blogs = blogs.filter(blog => new Date(blog.metadata.date) < new Date())

  if (filterTag)
    return { blogs: blogs.filter(blog => blog.metadata.tags.map(slugging).includes(filterTag)) }

  if (pageNumber === 0) return { blogs }

  const more = blogs.length - pageNumber * pageSize > 0
  return {
    blogs: blogs.slice(pageNumber * pageSize - pageSize, pageNumber * pageSize),
    more,
  }
}

export const getBlog = async slug => {
  const { blogs } = await getBlogs()
  const index = blogs.findIndex(blog => blog.slug === 'catatan/' + slug)

  try {
    return {
      slug,
      ...(await import(`../content/blogs/${slug}.md`)),
      prev: blogs[index - 1] || null,
      next: blogs[index + 1] || null,
    }
  } catch (e) {
    return null
  }
}

export const getTags = async () => {
  const { blogs } = await getBlogs()
  // console.log(blogs)
  let tags = [...new Set(arrFlat(blogs.map(blog => blog.metadata.tags)))]
  return tags.sort(strCompareByHuman)
}
