import slug from 'rehype-slug';
import autolinkHeadings from 'rehype-autolink-headings';
import stringfy from 'rehype-stringify';
import toc from '@jsdevtools/rehype-toc';

import hljs from 'highlight.js';
import hljsvelte from 'highlightjs-svelte';

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
      hljsvelte(hljs);
      hljs.registerAliases('sveltehtml', { languageName: 'svelte' });
      lang = lang && hljs.getLanguage(lang) ? lang : 'plaintext';
      return `<pre><code class="hljs-${lang}">${escape_svelty(
        hljs.highlight(code, { language: lang }).value
      )}</code></pre>`;
    }
  }
  // layout: {
  //   blog: "./src/routes/catatan/_layout.svelte",
  // }
};
