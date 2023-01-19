import { getPost } from '$lib/content'
import { error } from '@sveltejs/kit'

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const content = await getPost(params.slug)

  if (content) return { content }

  throw error(404, 'Catatan tidak ditemukan')
}
