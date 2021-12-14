import adapter from '@sveltejs/adapter-static'
import markdown from '@dansvel/vite-plugin-markdown'
import preprocess from 'svelte-preprocess'
import WindiCSS from 'vite-plugin-windicss'

import markedOptions from './marked.config.js'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [preprocess()],
  kit: {
    adapter: adapter(),

    // hydrate: false,
    router: false,

    prerender: {
      onError: 'continue'
    },

    target: '#svelte',

    vite: () => ({
      plugins: [markdown({ markedOptions }), WindiCSS()]
    })
  }
}

export default config
