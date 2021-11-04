---
title: Beginilah bagaimana aku membuat blog dengan SvelteKit
date: 2021-03-27
description: Blog statis menggunakan SSG pastilah kamu telah hafal bagaimana membuatnya. Namun catatan ini bukan untukmu, ini untuk diriku sendiri yang dengan bangga mampu mengutak-atik SvelteKit yang masih dalam Public Beta menjadi blog personal yang sederhana.
image: https://cdn.pixabay.com/photo/2015/07/02/10/40/writing-828911_960_720.jpg
category: Teknologi
tags:
  - Svelte
  - Markdown
  - Javascript
  - Vite
---

Oke. Mempertimbangkan isi catatan yang lebih singkat namun berbobot, dan tentu saja cacat verbal yang ku miliki. Mungkin mulai dari catatan ini hingga ke depannya, aku akan menjadi lebih _to the point_. Jadi, mari mulai.

## Instal SvelteKit dulu lah

```powershell
pnpm init svelte@next blog
cd blog
pnpm i
```

Oh iya. Ketika catatan ini dibuat versi SvelteKit ada di `1.0.0.next-61`. Pada versi ini, ketika kita melakukan _fresh init_, tidak hanya Typescript support dan pilihan penulisan style saja yang ditawarkan. Namun ada juga penawaran untuk menggunakan ESlint dan Prettier. Mantap, aku mengambil yang Prettier saja

## Hooks data postingan

Kamu ingin menyiapkan data berisi daftar post yang ada di direktori `contens/post` dan meta datanya, seperti judul dan deskripsi. Untuk itu kamu dapat menggunakan Hooks.

Hooks awalnya bernama Setup. Kamu membuat berkas opsional dengan nama `src/hooks.js` (atau `src/hooks.ts`, atau `src/hooks/index.js`). Jika kamu telah membuat berkas `setup` sebelumnya cukup ubah namanya menjadi `hooks`.

Jadi, mari buat berkas `src/hooks.js` supaya lebih sederhana.

```js
export async function getSession() {
  const posts = await Promise.all(
    Object.entries(import.meta.glob('/contents/post/*.md')).map(async ([path, page]) => {
      const { default: post } = await page();
      const { body, image, ...attributes } = post;
      const slug = path.split('/').pop().split('.').shift();
      return { slug, ...attributes };
    })
  );

  return {
    posts
  };
}
```

Oops, aku lupa memberitahu bahwa pada catatan ini blog yang dibuat akan menggunakan berkas Markdown alih-alih fetch API, tentu saja kamu dapat mengubah isi `getSession()` ini sesuai kebutuhan.

Satu lagi, alih-alih menggunakan `fs` milik Node untuk membaca berkas Markdown ~yang entah bisa atau tidak~, aku membuat sebuah [**vite-plugin-markdown**](https://www.npmjs.com/package/@dansvel/vite-plugin-markdown) untuk ini.

### Mari bahas kodenya.

1. `export async function getSession() {}` mewajibkan untuk mengembalikan sebuah objek murni tanpa _function_ yang akan diberikan kepada Browser menggunakan `session` setiap kali SvelteKit me-render sebuah halaman. [Cek dokumentasi resminya](https://kit.svelte.dev/docs#hooks).
2. `Object.entries(import.meta.glob('/contents/post/*.md')).map()` akan membuat sebuah array berisi objek dari hasil dynamic import menggunakan **Glob Import**, ini adalah fitur dari Vite.

   Penjelasan di [dokumentasi remsinya](https://vitejs.dev/guide/features.html#glob-import) sangat sederhana dan mudah dipahami. `import.meta.glob()` akan mengembalikan sebuah array berbentuk objek.

3. Karena menggunakan plugin tadi, maka hasil import akan mengembalikan array objek dari `marked.js`. Di contoh kode di atas, aku mengambil `slug` dari alamat file, dan `attribut` dari hasil import.
4. Terakhir, aku mengembalikan objek berisi daftar post yang aku aku namai `posts`. Kamu dapat melakukan pengurutan data jika perlu, misalnya berdasarkan tanggal.

## `src/post/index.svelte`

```sveltehtml
<script >
  import { session } from '$app/stores'

  const posts = $session.posts
</script>

{#each posts as post}
  <h2>{post.title}</h2>
{/each}
```

## `src/post/[slug].svelte`

Kamu tentu sudah paham berkas ini digunakan untuk menangani `alamat.web/post/judul-artikel`. Di berkas ini, kamu dapat memanggil objek dari `hooks` dengan cara berikut

```sveltehtml
<script context="module">
  export async function load({ page, session }) {
    const slug = page.params.slug
    const slugs = session.posts

    if (!slugs.includes(slug)) {
      return {
        status: 404,
        error: 'Catatan seperti itu tidak ada'
      }
    }

    const posts = await import.meta.glob('../../../contents/post/*.md')

    let post
    for (const path in posts) {
      if (slug === path.split('/').pop().split('.').shift()) {
        post = await posts[path]()
        post = { slug, ...post.default }
      }
    }

    return {
      props: { post }
    }
  }
</script>

<script>
  export let post
</script>

<h1>{post.title}</h1>
{@html post.body}
```

## Bonus

Untuk menggunakan plugin yang tadi di `index.svelte` dan `about.svelte` maupun `[slug].svelte` malah lebih mudah lagi.

```sveltehtml
<script>
  import content from '../../contents/page/index.md'
</script>

<h1>{content.title}</h1>
{@html content.body}
```

Ada yang terlewat? Beri tanggapan ya...
