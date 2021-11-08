---
title: Code highlighter Svelte untuk highlight.js
date: 2021-06-21
description: Menggunakan markdown memang membuat mudah, kita tinggal tambahkan highlight.js lalu BOOM!
image: https://lh3.googleusercontent.com/taqKTksgZ5Fztb5NCpAnxRHKIAoj6k1PZ30X1GpQjUURCj_hRFfN8rij-4R_qHq9mlDJTf2NG2175_dgzGps_M-yOg=w640-h400-e365-rj-sc0x00ffffff
category: Teknologi
tags:
  - highlight.js
  - Svelte
  - Markdown
---

## TLDR;

```js
import hljs from 'highlight.js'
import hljsvelte from 'highlightjs-svelte'
hljsvelte(hljs)

const highlighted = hljs.highlight('svelte', source).value
```

## Bagaimana aku melakukannya

Seperti yang telah [dibahas sebelumnya](/catatan/5-beginilah-bagaimana-aku-membuat-blog-dengan-sveltekit), aku menggunakan [`vite-plugin-markdown`](https://www.npmjs.com/package/@dansvel/vite-plugin-markdown) untuk menangani berkas `.md`. Mari bahas bagaimana aku mengaturnya di dalam SvelteKit.

## Instalasi

```
pnpm add -D vite-plugin-markdown highlight.js highlightjs-svelte
```

## konfigurasi

Plugin yang aku buat memang tidak membutuhkan marked dan highlight.js, namun untuk menyesuaikan konfigurasinya, dibutuhkan option dari mereka.

```js
// svelte.config.js
import preprocess from 'svelte-preprocess'
import WindiCSS from 'vite-plugin-windicss'
import staticSite from '@sveltejs/adapter-static'
import vitePluginMarkdown from '@dansvel/vite-plugin-markdown'
import markedOption from './marked.option.js'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [preprocess()],
  kit: {
    target: '#svelte',
    adapter: staticSite(),
    vite: () => ({
      plugins: [
        WindiCSS.default({
          configPath: './windi.config.js'
        }),
        vitePluginMarkdown(markedOption)
      ]
    })
  }
}

export default config
```

Di dalam `svelte.config.js` dapat dilihat aku menggunakan **Windi**. Selain desain blog secara keseluruhan, aku menggunakan plugin **typography** miliknya untuk memudahkan dalam mendesain konten. Yang perlu diperhatikan saat ini adalah bagian vite plugin, yaitu plugin yang kubuat dan optionnya yang aku tempatkan di file berbeda.

```js
// marked.option.js
import hljs from 'highlight.js'
import hljsvelte from 'highlightjs-svelte'

// inisialisasi
hljsvelte(hljs)
// membuat alias language untuk svelte
hljs.registerAliases('sveltehtml', { languageName: 'svelte' })

const highlight = (code, lang) => {
  // jika language tidak ditetapkan atau ngawur, gunakan plain text
  lang = lang && hljs.getLanguage(lang) ? lang : 'plaintext'
  return hljs.highlight(code, { language: lang }).value
}

export default { highlight }
```

Perhatikan bagaimana aku membutuhkan modul `hljs` untuk membuat option untuk pluginku. Jika kamu memerlukan option `renderer` milik **marked** kamu juga dapat menambahkannya di sini.

Setelah inisialisasi, sebenarnya kamu sudah dapat menggunakannya langsung seperti ini

```js
const highlight = (code, lang) => hljs.highlight(code, { language: lang }).value
```

Namun tentu saja akan menjadi kurang aman.

## Opsional

Nah, kenapa perlu menambahkan alias? kenapa tidak langsung menggunakan svelte pada kode di markdown seperti ini?

````sveltehtml
‍```svelte
<script>
  let name = 'dunia';
</script>

<h1>Halo {name}!</h1>
‍```
````

Tentu saja kamu dapat melakukannya. Namun, untuk yang menggunakan IDE Webstorm sepertiku, hasilnya tidak akan seperti yang diharapkan.

Jika kamu tidak menggunakan/peduli/masalah dengan highlighter di editor kesayanganmu, maka kamu dapat melewati bagian menambahkan alias.

## Hasilnya?

Yaa... Salah satu contoh hasilnya dapat di lihat di catatan ini lah. Bagaimana menurut kamu?
