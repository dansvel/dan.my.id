import { defineMDSveXConfig } from 'mdsvex'
import rehypeLinkProcessor from 'rehype-link-processor'
import slug from 'rehype-slug'
import autolinkHeadings from 'rehype-autolink-headings'
import stringfy from 'rehype-stringify'
import figure from 'rehype-figure'

import hljs from 'highlight.js'
import hljsvelte from 'highlightjs-svelte'

// import rehypeExternalLinks from 'rehype-external-links'

const escapeSvelty = str =>
	str
		.replace(/[{}`]/g, c => ({ '{': '&#123;', '}': '&#125;', '`': '&#96;' })[c])
		.replace(/\\([trn])/g, '&#92;$1')

const config = defineMDSveXConfig({
	extensions: ['.svelte.md', '.md', '.svx'],

	smartypants: {
		dashes: 'oldschool'
	},

	remarkPlugins: [],
	rehypePlugins: [
		slug,
		stringfy,

		figure,
		// rehypeExternalLinks({
		//   target: false,
		//   rel: ['nofollow', 'external'],
		// }),
		rehypeLinkProcessor({
			useBuiltin: false,
			rules: [
				// 'external',
				{
					match: link => link,
					action: {
						className: 'link link-primary external',
						target: '_blank',
						rel: 'nofollow noopener noreferrer'
					}
				},
				{
					match: link => link,
					action: { className: 'link link-primary' }
				}
			]
		}),

		[
			autolinkHeadings,
			{
				behavior: 'append',
				properties: { className: ['anchor'] },
				content: {
					type: 'text',
					value: '#'
				}
			}
		]
	],
	highlight: {
		highlighter: (code, lang = 'plaintext') => {
			hljsvelte(hljs)
			// hljs.registerAliases('sveltehtml', { languageName: 'svelte' })
			lang = lang === 'sveltehtml' ? 'svelte' : hljs.getLanguage(lang) ? lang : 'plaintext'
			return `<pre data-title="${lang}"><code class="hljs language-${lang}">${escapeSvelty(
				hljs.highlight(code, { language: lang }).value
			)}</code></pre>`
		}
	}
})

export default config
