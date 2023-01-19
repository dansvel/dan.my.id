import RSS from 'rss'
import site from '$lib/config.yaml'
import { getPages, getPosts } from '$lib/content'

export const prerender = true

export const GET = async () => {
  const feed = new RSS({
    title: site.title,
    description: site.description,
    site_url: site.url,
    language: 'id',
  })

  const pages = await getPages()
  const { posts } = await getPosts()
  // console.log(pages, posts)

  pages.concat(posts).map((page) => {
    feed.item({
      title: page.metadata.title,
      description: page.metadata.description,
      url: site.url + '/' + page.slug,
      date: page.metadata.date,
    })
  })

  return new Response(feed.xml(), {
    headers: { 'content-type': 'application/xml' },
  })
}
