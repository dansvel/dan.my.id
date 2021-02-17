import marked from 'marked';
import highlightJS from 'highlight.js';

const renderer = new marked.Renderer();

const highlight = (code, lang) => {
  lang = lang ? lang : 'plaintext';
  return highlightJS.highlight(lang, code).value;
};

renderer.link = (href, title, text) => {
  return `<a href="${href}" ${href.startsWith('http') ? '' : 'rel="prefetch"'} ${
    href.startsWith('http') ? 'target="_blank" rel="noopener"' : ''
  } ${title ? 'title="' + title + '"' : ''}>${text}</a>`;
};

renderer.image = (href, title, text) => {
  return `<figure><img src="${href}" alt="${text}"/><figcaption>${text}</figcaption></figure>`;
};

export default { renderer: renderer, highlight: highlight };
