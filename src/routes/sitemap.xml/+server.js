import { get_posts } from '$lib/server/content'
import { languageTag } from '$paraglide/runtime.js'
import config from '$lib/config.yaml'
import { SitemapStream, streamToPromise } from 'sitemap'
import { Readable } from 'stream'

export const prerender = true

export async function GET({ params }) {
	const posts = await get_posts(languageTag())

	const links = []

	posts.map(post => links.push({ url: '/' + post.slug, changefreq: 'daily', priority: 0.3 }))
	// console.log(links)
	// An array with your links

	// Create a stream to write to
	const stream = new SitemapStream({
		hostname: 'http://' + config.url,
		lastmodDateOnly: false, // print date not time
		xmlns: {
			// trim the xml namespace
			news: true, // flip to false to omit the xml namespace for news
			xhtml: true,
			image: false,
			video: false,
			custom: [
				'xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"',
				'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"'
			]
		}
	})

	const data = await streamToPromise(Readable.from(links).pipe(stream))

	return new Response(data.toString(), {
		headers: {
			'Cache-Control': `max-age=0, s-max-age=600`,
			'Content-Type': 'application/xml'
		}
	})
}
