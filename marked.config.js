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
          	${text}
            <a class="anchor" href="#${escapedText}">#</a>
					</h${level}>`
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