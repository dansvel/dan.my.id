const staticSite = require('@sveltejs/adapter-static')
const pkg = require('./package.json')

const sveltePreprocess = require('svelte-preprocess')
const vitePluginMarkdown = require('@dansvel/vite-plugin-markdown')
const markedOptions = require('./marked.config.cjs')

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
  preprocess: [
    sveltePreprocess({
      postcss: true
    })
  ],
  kit: {
    adapter: staticSite(),
    target: '#svelte',

    vite: {
      plugins: [vitePluginMarkdown(markedOptions)],
      ssr: {
        noExternal: Object.keys(pkg.dependencies || {})
      }
    }
  }
}
