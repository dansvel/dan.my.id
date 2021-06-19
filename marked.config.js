import marked from 'marked'
import hljs from 'highlight.js'
import hljsvelte from 'highlightjs-svelte'

const renderer = new marked.Renderer()

hljsvelte(hljs)
hljs.registerAliases('sveltehtml', { languageName: 'svelte' })
const highlight = (code, lang) => {
  lang = lang && hljs.getLanguage(lang) ? lang : 'plaintext'
  return hljs.highlight(code, { language: lang }).value
}

renderer.heading = (text, level) => {
  const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-')
  return `
          <h${level} id="${escapedText}">
            <a class="anchor" href="#${escapedText}">
              <svg class="" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
              </svg>
            </a>${text}</h${level}>`
}

renderer.link = (href, title, text) => {
  return `<a href="${href}" 
        ${href.startsWith('http') ? 'target="_blank" rel="noopener external"' : ''} 
        ${title ? 'title="' + title + '"' : ''}>${text}</a>`
}

renderer.image = (href, title, text) => {
  return `<figure><img src="${href}" alt="${text}"/><figcaption>${text}</figcaption></figure>`
}

export default { renderer, highlight }
