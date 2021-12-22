---
title: highlight.js di mdsvex
date: 2021-09-21
description: Karena bawaan mdsvex menggunakan prismjs, jadi aku menggantinya
category: Teknologi
tags: highlight.js, Markdown
---

Ceritanya, aku akhirnya beralih menggunakan **`mdsvex`**. Yang membuat menarik adalah, aku hanya perlu membuat file `__layout.svelte` dan sebuah file `.md` maka halaman web sudah jadi dengan indah. Mungkin aku bahas di catatan lain.

Aku ini sudah _sreg_ sekali dengan **`highlight.js`**, tak ada lawan lah. Sayangnya `mdsvex` menggunakan `prismjs`. Sialnya, situs resminya ada 2, isinya berbeda, https://mdsvex.com/docs#highlight dan https://mdsvex.pngwn.io/docs#highlight

Dan tidak bekerja seperti yang diharapkan. Setelah menemukan masalahnya, aku menuliskannya disini.

## Menggunakan mdsvex di SvelteKit

Jadi, kamu perlu memasang dan mengonfigurasi `mdsvex` di svelte-mu seperti yang kira-kira ada di dokumentasinya di sini https://mdsvex.com/docs#install-it

Di SvelteKit, aku menuliskannya seperti berikut

```js
import md from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],
  preprocess: [
    md.mdsvex(mdsvexConfig)
    // kalau pake preprocessor lain, tambahkan saja
  ],
  kit: {
    // konfigurasi sveltekit-mu
    // ...
  }
}

export default config
```

Aku bukan expert, aku tidak mengerti mengapa harus mengimpor `md` dan menggunakan `md.mdsvex()` tidak seperti di dokumentasi resminya.

## Konfigurasi highlighter untuk mdsvex

Seperti yang sudah ditulis pada `svelte.config.js`, kita menyimpan konfigurasi mdsvex di _file_ tersendiri.

```js
import hljs from 'highlight.js'
import hljsvelte from 'highlightjs-svelte'

const escape_svelty = str =>
  str
    .replace(/[{}`]/g, c => ({ '{': '&#123;', '}': '&#125;', '`': '&#96;' }[c]))
    .replace(/\\([trn])/g, '&#92;$1')

export default {
  extensions: ['.md'],
  remarkPlugins: [
    // jika kamu menggunakan remark plugin
  ],
  rehypePlugins: [
    // jika kamu menggunakan rehype plugin
  ],

  highlight: {
    highlighter: (code, lang) => {
      hljsvelte(hljs)
      hljs.registerAliases('sveltehtml', { languageName: 'svelte' })
      lang = lang && hljs.getLanguage(lang) ? lang : 'plaintext'
      return `<pre><code class="hljs-${lang}">${escape_svelty(
        hljs.highlight(code, { language: lang }).value
      )}</code></pre>`
    }
  }
}
```

Yang perlu diperhatikan disini adalah, kamu perlu melakukan sanitize untuk membuatnya bekerja. Terutama karena svelte akan mengeksekusi apapun di dalam kurung kurawal sebagai kode javascript, dan karakter spesial lain seperti backtick dan backslash.

Jadi aku membuat fungsi sederhana untuk masalah ini, dan itu berhasil menyelesaikannya. Sip...
