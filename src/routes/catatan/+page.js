import { redirect } from '@sveltejs/kit'

/** @type {import('./$types').LayoutServerLoad} */
export function load({ locals }) {
  throw redirect(301, '/catatan/2')
}
