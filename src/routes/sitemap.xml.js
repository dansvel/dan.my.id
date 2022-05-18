import site from '$lib/config.yaml'
import { getBlogs } from '$lib/content'
// import { getPosts, getPostsContent } from '$lib/utilities/blog';
const { blogs } = await getBlogs()

/**
 * @returns string
 * @param {string[]} pages
 * @param {{medata:{date: string}; slug: string;}[]} blogs
 */
function render(pages, blogs) {
  console.log(pages)
  return `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
	xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
	xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
  xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:pagemap="http://www.google.com/schemas/sitemap-pagemap/1.0"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
	>

	${pages
    .map(
      element => `
	<url>
	  <loc>${element}</loc>
		<lastmod>${`${process.env.VITE_BUILD_TIME}`}</lastmod>
		<changefreq>monthly</changefreq>
		<priority>0.7</priority>
	</url>`
    )
    .join('\n')}
	
	${blogs
    .map(blog => {
      return `
	<url>
	  <loc>${site.url}/catatan/${blog.slug}/</loc>
		<lastmod>${`${blog.metadata.date}`}</lastmod>
		<changefreq>daily</changefreq>
		<priority>0.7</priority>
	</url>
	`
    })
    .join('')}
</urlset>`.trim()
}

export async function get() {
  const pages = Object.keys(import.meta.glob('/src/content/pages/*.md')).map(page =>
    page.replace('/src/content/pages', site.url).replace('.md', '')
  )
  const etc = Object.keys(import.meta.glob('/src/routes/**/!(_)*.svelte'))
    .filter(page => {
      const filters = ['[', '_', 'private']

      return !filters.find(filter => page.includes(filter))
    })
    .map(page =>
      page.replace('/src/routes', site.url).replace('/index.svelte', '').replace('.svelte', '')
    )

  return {
    body: render([...pages, ...etc], blogs),
    headers: {
      'Cache-Control': `max-age=0, s-max-age=${600}`,
      'Content-Type': 'application/xml',
    },
  }
}
