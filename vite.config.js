import { sveltekit } from '@sveltejs/kit/vite'
import { resolve } from 'path'
import yaml from '@modyfi/vite-plugin-yaml'

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit(), yaml()],
  resolve: {
    alias: {
      $content: resolve('./src/content'),
      $component: resolve('./src/component'),
    },
  },
}

export default config
