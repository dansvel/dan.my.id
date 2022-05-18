import RSS from 'rss'
import site from '$lib/config.yaml'
import { getPages, getBlogs } from '$lib/content'

export const get = async () => {
  const feed = new RSS({
    title: site.title,
    description: site.description,
    site_url: site.url,
    language: 'id',
  })

  const pages = await getPages()
  const { blogs } = await getBlogs()
  // console.log(pages, blogs)

  pages.concat(blogs).map(page => {
    feed.item({
      title: page.metadata.title,
      description: page.metadata.description,
      url: site.url + '/' + page.slug,
      date: page.metadata.date,
    })
  })

  return {
    headers: { 'content-type': 'application/xml' },
    body: feed.xml(),
  }
}
