import preprocess from 'svelte-preprocess'
import WindiCSS from 'vite-plugin-windicss'
import staticSite from '@sveltejs/adapter-static'
import vitePluginMarkdown from '@dansvel/vite-plugin-markdown'
import markedOption from './marked.config.js'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [preprocess()],
  kit: {
    target: '#svelte',
    adapter: staticSite(),
    vite: () => ({
      plugins: [
        WindiCSS.default({
          configPath: './windi.config.js'
        }),
        vitePluginMarkdown(markedOption)
      ]
    })
  }
}

export default config
