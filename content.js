// import { arrFlat, slugging, strCompareByHuman } from '$lib/util.js'
// import config from '$lib/config.yaml'
// import { dev } from '$app/environment'
//
// const { pageSize } = config
// // const pageSize = 13
//
// /**
//  * @typedef {Object} PostMeta
//  * @property {string} title - The title of the post
//  * @property {string} date - The date of the post (in YYYY-MM-DD format)
//  * @property {string} description - The description of the post
//  * @property {string} category - The category of the post
//  * @property {string[]} tags - An array of tags for the post
//  * @property {string} [slug] - The slug for the post
//  */
//
// // export const getPages = async () => {
// // 	const files = import.meta.glob('./content/pages/**.md')
// // 	let pages = Object.entries(files).map(async ([path, content]) => {
// // 		return {
// // 			slug: path.split('/').pop().slice(0, -3),
// // 			metadata: (await content()).metadata,
// // 		}
// // 	})
// // 	return await Promise.all(pages)
// // }
//
// /**
//  * Represents metadata and content for the "Tentang" (About) page.
//  *
//  * @typedef {Object} Page
//  * @property {string} slug - The unique identifier or URL-friendly version of the page.
//  * @property {PostMeta} metadata - Metadata related to the page.se).
//  * @property {Function} default - The default function for rendering the page content.
//  */
// export const getPage = async slug => {
// 	try {
// 		return { slug, ...(await import(`./content/pages/${slug}.md`)) }
// 	} catch (e) {
// 		return null
// 	}
// }
//
// /**
//  * Retrieves a list of posts based on the provided filter tag and page number.
//  *
//  * @param {Object} options - The options for filtering and pagination.
//  * @param {string} [options.filterTag=''] - The tag used to filter the posts (optional).
//  * @param {number} [options.pageNum=0] - The page number for pagination (optional).
//  * @return {{posts: Promise<{slug: string, metadata: PostMeta}[]>, more: boolean}} An object containing the list of posts.
//  */
// export const getPosts = async ({ filterTag = '', pageNum = 0 } = {}) => {
// 	if (typeof pageNum !== 'number' && pageNum < 0) return []
//
// 	const files = import.meta.glob('./content/posts/**.md')
// 	let posts = Object.entries(files).map(async ([path, content]) => {
// 		return {
// 			slug: 'catatan/' + path.split('/').pop().slice(0, -3),
// 			metadata: (await content()).metadata
// 		}
// 	})
//
// 	posts = await Promise.all(posts).then(r =>
// 		r.sort((a, b) => new Date(b.metadata.date) - new Date(a.metadata.date))
// 	)
//
// 	if (!dev) posts = posts.filter(post => new Date(post.metadata.date) <= new Date())
//
// 	if (pageNum === 0 || pageSize === 0) return { posts, more: false }
//
// 	if (filterTag) posts = posts.filter(post => post.metadata.tags.map(slugging).includes(filterTag))
//
// 	return {
// 		posts: posts.slice(pageNum * pageSize - pageSize, pageNum * pageSize),
// 		more: posts.length - pageNum * pageSize > 0
// 	}
// }
//
// /**
//  * Represents metadata and content for a post.
//  *
//  * @typedef {Object} Post
//  * @property {string} slug - The unique identifier or URL-friendly version of the post.
//  * @return {{slug: string, metadata: PostMeta, default: Function, prev: {slug: string, metadata: PostMeta}, next: {slug: string, metadata: PostMeta}}}
//  */
//
// export const getPost = async slug => {
// 	const { posts } = await getPosts()
// 	const index = posts.findIndex(post => post.slug === 'catatan/' + slug)
//
// 	try {
// 		return {
// 			slug,
// 			...(await import(`./content/posts/${slug}.md`)),
// 			prev: posts[index - 1] || null,
// 			next: posts[index + 1] || null
// 		}
// 	} catch (e) {
// 		return null
// 	}
// }
//
// /**
//  * Retrieves all the tags from the posts and returns them sorted.
//  *
//  * @return {string[]} An array of tags.
//  */
// export const getTags = async () => {
// 	const { posts } = await getPosts()
// 	// console.log(posts)
// 	let tags = [...new Set(arrFlat(posts.map(post => post.metadata.tags)))]
// 	console.log(tags)
//
// 	return tags.sort(strCompareByHuman)
// }
