<script>
	import config from '$lib/config.yaml'

	export let url
	export let title
	export let description
	export let keywords
	// export let image

	$: title = title ? `${title} — ${config.title}` : `${config.title} — ${config.description}`
	$: description = description || config.description
	$: keywords = keywords.join(', ') || config.keywords
	$: url = config.url + url
	// $: image = image.startsWith('http') ? image : config.url + image
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{title}</title>
	<meta name="title" content={title} />
	<meta name="description" content={description} />
	<meta name="keywords" content={keywords} />
	<meta name="author" content={config.author.name} />
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<!--{#if image}-->
	<!--	<meta property="og:image" content={image} />-->
	<!--{/if}-->
	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={url} />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	<!--{#if image}-->
	<!--	<meta property="twitter:image" content={image} />-->
	<!--{/if}-->
</svelte:head>
