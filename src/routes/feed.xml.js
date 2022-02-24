import RSS from 'rss'
import { siteTitle, siteDescription, siteURL } from "$lib/config.js";

export const get = () => {
  const feed = new RSS({
    title: siteTitle,
    description: siteDescription,
    site_url: siteURL,
    language: 'id'
  })

  const files = import.meta.globEager('../content/posts/*.md')
  for (const path in files) {
    if (path.split('/').pop().match(/\.md$/)) {
      const { metadata } = files[path]

      if (!metadata.draft) {
        feed.item({
          title: metadata.title,
          description: metadata.description,
          url: siteURL + path.split('/').pop().slice(0, -3),
          date: metadata.date
        })
      }

    }
  }


  return {
    headers: { 'content-type': 'application/xml' },
    body: feed.xml()
  }
}
