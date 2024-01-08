import { sourceLanguageTag, availableLanguageTags } from '$paraglide/runtime'

/**
 * Takes in a path with or without a language tag and returns the path with the given language tag.
 * @returns
 */
export const translatePath = (path, lang) => {
	path = getPathWithoutLang(path)

	//Don't prefix with the source language tag, that's the default
	if (lang === sourceLanguageTag) return path
	//Otherwise, prefix with the language tag
	else return `/${lang}${path}`
}

/**
 * Removes the language tag from the path, if it exists.
 */
export const getPathWithoutLang = path => {
	const [_, maybeLang, ...rest] = path.split('/')
	if (availableLanguageTags.includes(maybeLang)) return `/${rest.join('/')}`
	else return path
}

/**
 * Look up the text direction for a given locale.
 * You could use a Polyfill for `Intl.Locale.prototype.getTextInfo` instead.
 */
export const getTextDirection = locale => {
	const directions = {
		en: 'ltr',
		de: 'ltr'
	}

	return directions[locale]
}
