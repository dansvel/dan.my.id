<script context="module">
	export async function load({ page, session }) {
		const slug = page.params.slug;
		const slugs = session.posts.map((page) => page.slug.match(/^(\d+-[a-z-]+)$/)[1]);
		if (!slugs.includes(slug)) {
			return {
				status: 404,
				error: 'Catatan seperti itu tidak ada'
			};
		}
		const posts = await import.meta.glob('../../../contents/post/*.md');
		let post;
		for (const path in posts) {
			if (slug === path.split('/').pop().split('.').shift()) {
				post = await posts[path]();
				post = { slug, ...post.default };
			}
		}
		return {
			props: {
				post
			}
		};
	}
</script>

<script>
	import Page from '$lib/Page.svelte';
	export let post;
</script>

<Page content={post} />
