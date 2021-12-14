import hljs from 'highlight.js'
import hljsvelte from 'highlightjs-svelte'
import { marked } from 'marked'

const renderer = new marked.Renderer()

renderer.link = (href, title, text) => {
  return `<a href="${href}" 
        ${href.startsWith('http') ? 'target="_blank" rel="noopener external"' : ''} 
        ${title ? 'title="' + title + '"' : ''}>${text}</a>`
}

renderer.image = (href, title, text) => {
  return `<figure><img src="${href}" alt="${text}"/><figcaption>${text}</figcaption></figure>`
}

const escape_svelty = str =>
  str
    .replace(/[{}`]/g, c => ({ '{': '&#123;', '}': '&#125;', '`': '&#96;' }[c]))
    .replace(/\\([trn])/g, '&#92;$1')

hljsvelte(hljs)
hljs.registerAliases('sveltehtml', { languageName: 'svelte' })
const highlight = (code, lang) => {
  lang = lang && hljs.getLanguage(lang) ? lang : 'plaintext'
  return hljs.highlight(code, { language: lang }).value
  // return `<pre><code class="hljs language-${lang}">${escape_svelty(
  //   hljs.highlight(code, { language: lang }).value
  // )}</code></pre>`
}

export default { renderer, highlight }
