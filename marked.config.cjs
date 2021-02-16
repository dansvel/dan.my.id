const marked = require('marked');
const highlightJS = require('highlight.js');

const renderer = new marked.Renderer()

renderer.link = (href, title, text) => {
    return `<a href="${href}" ${href.startsWith('http') ? '' : 'rel="prefetch"'} ${href.startsWith('http') ? 'target="_blank"' : ''} ${title ? 'title="'+title+'"' : ''}>${text}</a>`
}

const highlight = (code, lang) => {
    lang = lang ? lang : 'plaintext'
    return highlightJS.highlight(lang, code).value;
}

renderer.image = (href, title, text) => {
    return `<figure><img src="${href}" alt="${text}"/><figcaption>${text}</figcaption></figure>`
}

module.exports = { renderer: renderer, highlight: highlight }