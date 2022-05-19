import adapter from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'
import WindiCSS from 'vite-plugin-windicss'
import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
import yaml from '@modyfi/vite-plugin-yaml'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md', '.svx'],
  preprocess: [preprocess(), mdsvex(mdsvexConfig)],
  kit: {
    adapter: adapter(),
    browser: {
      // hydrate: false,
      router: false,
    },
    prerender: {
      default: true,
      onError: 'continue',
    },
    vite: () => ({
      plugins: [WindiCSS(), yaml()],
    }),
  },
}

export default config
