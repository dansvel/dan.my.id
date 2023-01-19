import site from '$lib/config.yaml'
import { getPosts } from '$lib/content'

const { posts } = await getPosts()

/**
 * @returns string
 * @param {string[]} pages
 * @param {{medata:{date: string}; slug: string;}[]} posts
 */
function render(pages, posts) {
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
      (element) => `
	<url>
	  <loc>${element}</loc>
		<lastmod>${`${process.env.VITE_BUILD_TIME}`}</lastmod>
		<changefreq>monthly</changefreq>
		<priority>0.7</priority>
	</url>`
    )
    .join('\n')}
	
	${posts
    .map((post) => {
      return `
	<url>
	  <loc>${site.url}/catatan/${post.slug}/</loc>
		<lastmod>${`${post.metadata.date}`}</lastmod>
		<changefreq>daily</changefreq>
		<priority>0.7</priority>
	</url>
	`
    })
    .join('')}
</urlset>`.trim()
}
export const prerender = true
export async function GET() {
  const pages = Object.keys(import.meta.glob('/src/content/pages/*.md')).map((page) =>
    page.replace('/src/content/pages', site.url).replace('.md', '')
  )
  const etc = Object.keys(import.meta.glob('/src/routes/**/!(_)*.svelte'))
    .filter((page) => {
      const filters = ['[', '_', 'private']

      return !filters.find((filter) => page.includes(filter))
    })
    .map((page) =>
      page.replace('/src/routes', site.url).replace('/index.svelte', '').replace('.svelte', '')
    )

  // return {
  //   body: render([...pages, ...etc], posts),
  //   headers: {
  //     'Cache-Control': `max-age=0, s-max-age=${600}`,
  //     'Content-Type': 'application/xml',
  //   },
  // }

  return new Response(render([...pages, ...etc], posts), {
    headers: {
      'Cache-Control': `max-age=0, s-max-age=${600}`,
      'Content-Type': 'application/xml',
    },
  })
}
