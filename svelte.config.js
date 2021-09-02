import preprocess from 'svelte-preprocess';
import staticSite from '@sveltejs/adapter-static';
import WindiCSS from 'vite-plugin-windicss';
import vitePluginMarkdown from '@dansvel/vite-plugin-markdown';
import markedOption from './marked.config.js';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		adapter: staticSite(),
		target: '#svelte',
		vite: () => ({
			plugins: [WindiCSS.default(), vitePluginMarkdown(markedOption)],
			resolve: {
				alias: {
					// these are the aliases and paths to them
					$contents: path.resolve('./contents')
				}
			}
		})
	}
};

export default config;
