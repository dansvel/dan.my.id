import RSS from 'rss'
import { site } from '$lib/config'

export const get = () => {
  const feed = new RSS({
    title: site.title,
    description: site.description,
    site_url: site.url,
    language: 'id',
  })

  const blogs = import.meta.globEager('../content/blogs/*.md')
  const pages = import.meta.globEager('../content/pages/*.md')

  const files = { ...blogs, ...pages }

  for (const path in files) {
    if (path.split('/').pop().match(/\.md$/)) {
      const { metadata } = files[path]

      if (!metadata.draft) {
        feed.item({
          title: metadata.title,
          description: metadata.description,
          url: site.url + '/' + path.split('/').pop().slice(0, -3),
          date: metadata.date,
        })
      }
    }
  }

  return {
    headers: { 'content-type': 'application/xml' },
    body: feed.xml(),
  }
}
