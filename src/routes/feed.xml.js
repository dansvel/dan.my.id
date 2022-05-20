import RSS from 'rss'
import site from '$lib/config.yaml'
import { getPages, getPosts } from '$lib/content'

export const get = async () => {
  const feed = new RSS({
    title: site.title,
    description: site.description,
    site_url: site.url,
    language: 'id',
  })

  const pages = await getPages()
  const { posts } = await getPosts()
  // console.log(pages, posts)

  pages.concat(posts).map(page => {
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
