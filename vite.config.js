import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import importableYAML from '@importable/yaml/vite'
import { resolve } from 'path'
export default defineConfig({
	plugins: [sveltekit(), importableYAML()],

	resolve: {
		alias: {
			$content: resolve('./content'),
			$paraglide: resolve('./src/paraglide')
			// $component: resolve('./src/component'),
		}
	}
})
