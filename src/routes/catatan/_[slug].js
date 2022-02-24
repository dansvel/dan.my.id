/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = async ({ params }) => {
  console.log(params.slug.match(/^\d+$/), 'falltrough')
  if (params.slug.match(/^\d+$/)) return { fallthrough: true }
}
