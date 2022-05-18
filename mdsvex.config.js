import slug from 'rehype-slug'
import autolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import stringfy from 'rehype-stringify'
import figure from 'rehype-figure'

import hljs from 'highlight.js'
import hljsvelte from 'highlightjs-svelte'

const escape_svelty = str =>
  str
    .replace(/[{}`]/g, c => ({ '{': '&#123;', '}': '&#125;', '`': '&#96;' }[c]))
    .replace(/\\([trn])/g, '&#92;$1')

export default {
  extensions: ['.md', '.svx'],
  // layout: {
  //   homepage: "./src/layout/Homepage.svelte",
  //   _: "./src/layout/Post.svelte"
  // },
  // remarkPlugins: [
  //   //
  // ],
  rehypePlugins: [
    //
    slug,
    stringfy,
    [
      autolinkHeadings,
      {
        behavior: 'append',
        properties: { className: ['anchor'] },
        content: {
          type: 'text',
          value: '#',
        },
      },
    ],
    figure,
    [rehypeExternalLinks, { target: false, rel: ['nofollow', 'external'] }],
  ],

  highlight: {
    highlighter: (code, lang = 'plaintext') => {
      hljsvelte(hljs)
      // hljs.registerAliases('sveltehtml', { languageName: 'svelte' })
      lang = lang === 'sveltehtml' ? 'svelte' : hljs.getLanguage(lang) ? lang : 'plaintext'
      return `<pre data-title="${lang}"><code class="hljs language-${lang}">${escape_svelty(
        hljs.highlight(code, { language: lang }).value
      )}</code></pre>`
    },
  },
}
