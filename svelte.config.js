import adapter from '@sveltejs/adapter-static'
import { resolve } from 'path'
import preprocess from 'svelte-preprocess'
import WindiCSS from 'vite-plugin-windicss'

import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],
  preprocess: [preprocess(), mdsvex(mdsvexConfig)],
  kit: {
    adapter: adapter(),
    // browser: {
    // hydrate: false,
    // router: false,
    // },
    prerender: {
      // onError: 'continue',
      default: true,
    },
    vite: () => ({
      optimizeDeps: {
        include: ['highlight.js/lib/core'],
      },
      plugins: [WindiCSS()],
      resolve: {
        alias: {
          $content: resolve('./src/content'),
        },
      },
    }),
  },
}

export default config
