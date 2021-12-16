import RSS from 'rss'

export const get = () => {
  const feed = new RSS({
    title: 'Blog milik Dan',
    description: 'Catatan perjalanan Setengah Manusia',
    site_url: 'htps://dan.my.id',
    language: 'id'
  })

  const files = import.meta.globEager('./_posts/*.md')
  for (const path in files) {
    const {
      attributes: { title, description, date }
    } = files[path]

    feed.item({
      title,
      description,
      url: 'https://dan.my.id/' + path.split('/').pop().split('.').shift(),
      date,
    })
  }

  return {
    headers: { 'content-type': 'application/xml' },
    body: feed.xml()
  }
}
