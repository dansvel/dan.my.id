// export const objectInvert = obj => Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k]))
export const localDate = new Intl.DateTimeFormat('id-ID', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
})
export const localDateTime = new Intl.DateTimeFormat('id-ID', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
})

export const strCompareByHuman = (a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })

export const arrFlat = arr =>
  [].concat.apply(
    [],
    arr.map(a => (Array.isArray(a) ? arrFlat(a) : a))
  )

export const slugging = text => {
  if (typeof text !== 'string') text = text.toString()
  return text.toLowerCase().replace(/[^a-zA-Z0-9]/, '-')
}

export const parseMarkdownLine = markdownText => {
  const htmlText = markdownText
    .replace(/\*\*(.*?)\*\*/gim, '<b>$1</b>')
    .replace(/\*(.*?)\*/gim, '<i>$1</i>')
    .replace(/`(.*?)`/gi, '<code>$1</code>')
    .replace(/~~(.*?)~~/gim, '<del>$1</del>')
    .replace(/~(.*?)~/gim, '<sub>$1</sub>')
    .replace(/\^(.*?)\^/gim, '<sup>$1</sup>')
  // .replace(/==(.*?)==/gim, '<mark>$1</mark>')

  return htmlText.trim()
}

// export const urltoFile = (url, filename, mimeType) =>
//   fetch(url)
//     .then(res => res.arrayBuffer())
//     .then(buf => new File([buf], filename, { type: mimeType }))

/** Dispatch event on click outside of node */
export function clickOutside(node) {
  const handleClick = event => {
    if (node && !node.contains(event.target) && !event.defaultPrevented) {
      node.dispatchEvent(new CustomEvent('click_outside', node))
    }
  }

  document.addEventListener('click', handleClick, true)

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true)
    },
  }
}
