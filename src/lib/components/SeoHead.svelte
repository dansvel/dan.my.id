<script>
  export let url = ''
  export let title = 'Blog milik Dan'
  export let description = 'Catatan perjalanan setengah manusia'
  export let tags = ['Setengah manusia', 'Svelte']
  export let image = '/images/perjalanan-setengah-manusia.png'

  const author = 'Dan'
  const host = 'https://dan.my.id'

  url = host + url
  image = image.startsWith('http') ? image : host + image
</script>

<svelte:head>
  <!-- Primary Meta Tags -->
  <title>{title}</title>
  <meta name="title" content={title} />
  <meta name="description" content={description} />
  <meta name="keywords" content={tags.join(', ')} />
  <meta name="author" content={author} />
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={url} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={image} />
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={url} />
  <meta property="twitter:title" content={title} />
  <meta property="twitter:description" content={description} />
  <meta property="twitter:image" content={image} />
</svelte:head>
