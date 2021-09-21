import slug from 'rehype-slug';
import autolinkHeadings from 'rehype-autolink-headings';
import stringfy from 'rehype-stringify';
import toc from '@jsdevtools/rehype-toc';

import hljs from 'highlight.js';

const escape_svelty = (str) =>
  str
    .replace(/[{}`]/g, (c) => ({ '{': '&#123;', '}': '&#125;', '`': '&#96;' }[c]))
    .replace(/\\([trn])/g, '&#92;$1');

export default {
  extensions: ['.md'],
  rehypePlugins: [
    slug,
    toc,
    stringfy,
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
    highlighter: (code, lang) => {
      lang = lang && hljs.getLanguage(lang) ? lang : 'plaintext';
      return `<pre><code>${escape_svelty(
        hljs.highlight(code, { language: lang }).value
      )}</code></pre>`;
    },
    alias: { sveltehtml: 'svelte' }
  }
  // layout: {
  //   blog: "./src/routes/catatan/_layout.svelte",
  // }
};
