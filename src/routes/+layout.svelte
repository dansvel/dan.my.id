<script>
	import { browser } from '$app/environment'
	import { page } from '$app/stores'
	import { getTextDirection, translatePath } from '$lib/i18n'
	import {
		availableLanguageTags,
		languageTag,
		setLanguageTag,
		sourceLanguageTag
	} from '$paraglide/runtime'

	import '../app.postcss'
	import Navbar from '$lib/component/Navbar.svelte'
	import config from '$lib/config.yaml'
	import * as m from '$paraglide/messages.js'
	import { slugging } from '$lib/util.js'

	//Determine the current language from the URL. Fall back to the source language if none is specified.
	$: lang = $page.params.lang ?? sourceLanguageTag

	//Set the language tag in the Paraglide runtime.
	//This determines which language the strings are translated to.
	//You should only do this in the template, to avoid concurrent requests interfering with each other.
	$: setLanguageTag(lang)

	//Determine the text direction of the current language
	$: textDirection = getTextDirection(lang)

	//Keep the <html> lang and dir attributes in sync with the current language
	$: if (browser) {
		document.documentElement.dir = textDirection
		document.documentElement.lang = lang
	}
</script>

<svelte:head></svelte:head>

<!-- Rerender the page whenever the language changes -->
{#key lang}
	<Navbar>
		<svelte:fragment slot="title">
			<a
				href={translatePath('/', lang)}
				class="btn btn-ghost normal-case btn-sm"
				title={m.judulBlog()}>{m.judulBlog()}</a
			>
		</svelte:fragment>

		<svelte:fragment slot="links">
			<!--			<label class="flex cursor-pointer gap-2">-->
			<!--				<span class="label-text">Current</span>-->
			<!--				<input type="checkbox" value="synthwave" class="toggle theme-controller"/>-->
			<!--				<span class="label-text">Synthwave</span>-->
			<!--			</label>-->
			{#each availableLanguageTags as lang}
				{#if lang !== languageTag()}
					<li>
						<a href={translatePath('/', lang)} hreflang={lang}>
							{m.menuGantiBahasa()}
						</a>
					</li>
				{/if}
			{/each}
			<li>
				<a href={translatePath('/' + slugging(m.linkProyek()), lang)}>{m.menuProyek()}</a>
			</li>
			<li>
				<a href={translatePath('/' + slugging(m.linkTentang()), lang)}>{m.menuTentang()}</a>
			</li>
			<li>
				<a href="https://s.id/dansvel" rel="external noopener">s.id</a>
			</li>
		</svelte:fragment>
	</Navbar>

	<div class="max-w-3xl mx-auto p-4">
		<slot />
	</div>
{/key}
