// Consult https://vitejs.dev/config/ to learn about these options
import { join, resolve } from 'path';
import { readFileSync } from 'fs';
import { cwd } from 'process';

import vitePluginMarkdown from '@dansvel/vite-plugin-markdown';
import markedOptions from './marked.config.js'

const pkg = JSON.parse(readFileSync(join(cwd(), 'package.json')));

/** @type {import('vite').UserConfig} */
export default {
    plugins: [
        vitePluginMarkdown(markedOptions)
    ],
	ssr: {
		noExternal: Object.keys(pkg.dependencies || {})
	}
};
