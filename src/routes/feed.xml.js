import RSS from 'rss'

const files = import.meta.globEager('./_posts/*.md')
const posts = []

for (const path in files) {
  const {
    attributes: { title, description }
  } = files[path]
  posts.push({
    title,
    description,
    url: 'https://dan.my.id/' + path.split('/').pop().split('.').shift()
  })
}

export const get = () => {
  const feed = new RSS({
    title: 'Blog milik Dan',
    description: 'Catatan perjalanan Setengah Manusia',
    site_url: 'htps://dan.my.id',
    language: 'id'
  })

  posts.forEach(post => feed.item(post))
  return {
    headers: { 'content-type': 'application/xml' },
    body: feed.xml()
  }
}
