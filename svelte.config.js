import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import md from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import WindiCSS from 'vite-plugin-windicss';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],
  preprocess: [preprocess(), md.mdsvex(mdsvexConfig)],
  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    adapter: adapter(),
    target: '#svelte',
    vite: () => ({
      plugins: [WindiCSS.default()]
    })
  }
};

export default config;
