---
title: Komentar blog statis dengan Webmention
date: 2021-03-31
description: Menanggapi dan berkomentar sekaligus promosi di media sosial, kenapa tidak?
image: https://cdn.pixabay.com/photo/2018/02/12/10/45/heart-3147976_960_720.jpg
category: Teknologi
tags:
- Webmention
- Sistem komentar
---

Aku menemukan Webmention ini belum lama, jadi aku belum begitu memahami dan belum begitu mampu menjelaskan. Jadi biar ku beri saran lebih dahulu, cek situs resminya di https://webmention.io/

## Apa itu Webmention?

Sejauh yang aku pahami sampai saat ini, Webmention mengumpulkan semua konten di media sosial yang "menandai" akun media sosialmu dan sebuah artikel. Data itu akan dianggap sebagai tanggapan terkait sebuah artikel tersebut. 

Kita dapat menggunakan data tadi sebagai sistem untuk memberi tanggapan atau komentar. Mungkin kamu lebih sering melihat contoh penggunaannya untuk Twitter, namun Webmention juga dapat menjaring konten di Facebook, Instagram dan lain-lain yang akan ku jelaskan kemudian.

Mungkin terdengar rumit ketimbang [memasang Utterances](https://catatanzen.my.id/memasang-utterances-di-svelte-kit), tapi ini akan sepadan.

## Persiapan

Pertama kamu perlu membuat akun di [https://webmention.io/](https://webmention.io/). Cara paling gampang adalah dengan login menggunakan alamat webmu. Untuk itu kamu perlu menambahkan salah satu baris atau semua dari kode di bawah ini di dalam tag `<head>`

```html
<link href="https://github.com/dansvel" rel="me" />
<link href="https://twitter.com/dansvel" rel="me" />
<link href="mailto:me@example.com" rel="me" />
```

Lalu supaya web kamu dapat mengirim dan menerima Webmention, kamu perlu menambahkan dua baris ini di dalam tag `<head>`

```html
<link rel="webmention" href="https://webmention.io/dan.my.id/webmention" />
<link rel="pingback" href="https://webmention.io/dan.my.id/xmlrpc" />
```

Selanjutnya kamu perlu layanan webmention, [Bridgy](https://brid.gy/) adalah yang paling mudah menurut saya, tidak perlu hosting dan mencangkup banyak platform. Bridgy lah yang akan mencari dan menyimpan semua data konten di media sosial yang menandai artikel web kita.

Mendaftar di Bridgy sama mudahnya dengan sebelumnya. Hubungkan akun media sosialmu. Lalu lakukan **crawl**

## Menerapkan Webmention

Untuk mendapatkan semua *mention* yang terkait catatan ini, kamu cukup melakukan `fetch` di alamat ini `https://webmention.io/api/mentions.jf2?target=https://dan.my.id/catatan/6-komentar-blog-statis-dengan-webmention/`

Nah, mari olah datanya untuk ditampilkan di Svelte.

Untuk blogku ini, aku hanya perlu sebuah Svelte *component*. `src/lib/components/Webmention.svelte`

```sveltehtml
<script>
  import { onMount } from 'svelte'

  export let slug

  slug = 'https://dan.my.id/' + slug
  let mentions
  const tweet = `Catatan menarik dari @dansvel ${slug}`

  onMount(async () => {
    mentions = await fetch(
      `https://webmention.io/api/mentions.jf2?sort-by=published&target=${slug}/`
    )
      .then(res => res.json())
      .then(x => {
        const likes = x.children.filter(x => x['wm-property'] === 'like-of')
        const retweets = x.children.filter(x => x['wm-property'] === 'repost-of')
        const replies = x.children.filter(
          x => x['wm-property'] === 'mention-of' || x['wm-property'] === 'in-reply-to'
        )
        return { likes, retweets, replies }
      })
  })
</script>

<div class="prose lg:prose-lg xl:prose-xl max-w-none">
  <section>
    <hr />
    <h2>Webmention</h2>
    <p>
      <a
        href="https://twitter.com/intent/tweet/?text={tweet}"
        target="_blank"
        rel="noopener">Cuitkan sesuatu tentang catatan ini di Twitter</a
      >, itu akan muncul disini.
    </p>
  </section>
</div>

{#await mentions then data}
  {#if data !== undefined}
    {#if !data.likes.length && !data.retweets.length && !data.retweets.length}
      <section>
        <div class="prose lg:prose-lg xl:prose-xl max-w-none">
          <blockquote>Jadilah yang pertamax memberi tanggapan.</blockquote>
        </div>
      </section>
    {/if}

    {#if data.likes.length}
      <section>
        <h3>Suka</h3>
        <ul>
          {#each data.likes as like}
            <li>
              <a
                href={like.url}
                target="_blank"
                rel="noopener external"
                title={like.author.name}
              >
                {#if like.author.photo}
                  <img
                    src={like.author.photo}
                    alt={like.author.name}
                    width="48"
                    height="48"
                    loading="lazy"
                  />
                {:else}
                  <img
                    src="/images/default-avatar.png"
                    alt={like.author.name}
                    width="48"
                    height="48"
                    loading="lazy"
                  />
                {/if}
              </a>
            </li>
          {/each}
        </ul>
      </section>
    {/if}

    {#if data.retweets.length}
      <section>
        <h3>Retweet</h3>
        <ul>
          {#each data.retweets as retweet}
            <li>
              <a
                target="_blank"
                href={retweet.url}
                rel="noopener external"
                title={retweet.author.name}
              >
                {#if retweet.author.photo}
                  <img
                    src={retweet.author.photo}
                    alt={retweet.author.name}
                    width="48"
                    height="48"
                    loading="lazy"
                  />
                {:else}
                  <img
                    src="/images/default-avatar.png"
                    alt={retweet.author.name}
                    width="48"
                    height="48"
                    loading="lazy"
                  />
                {/if}
              </a>
            </li>
          {/each}
        </ul>
      </section>
    {/if}

    {#if data.replies.length}
      <section>
        <h3>Balasan</h3>
        <ul class="replies">
          {#each data.replies as message}
            <li>
              <div class="avatar">
                <a
                  href={message.url}
                  target="_blank"
                  rel="noopener external"
                  title={message.author.name}
                >
                  <img
                    src={message.author.photo}
                    alt={message.author.name}
                    width="48"
                    height="48"
                    loading="lazy"
                  />
                </a>
              </div>
              <div class="message max-w-none">
                <p>
                  <strong>{message.author.name}</strong> -
                  {message.published}
                </p>
                {@html message.content.html}
              </div>
            </li>
          {/each}
        </ul>
      </section>
    {/if}
  {/if}
{/await}
```

Inti dari kode di atas adalah, mengambil data *mention* menggunakan `fetch`, menyaringnya untuk diambil *like*, *retweet*, dan *reply*.

Karena keluaran `onMount` adalah `promise`, maka aku menggunakan `await` di untuk menangkap hasilnya. lalu menggunakan pengecekan `if` untuk setiap jenis tanggapan. Kamu boleh saja hanya mengambil beberaa jenis, atau malah menggabungkannya menjadi satu. Itu hanya bagaimana kamu ingin menampilkan datanya. 

Jika kamu mengikutiku, maka kamu hanya perlu memberi sedikit css untuk *component* ini dan paling tidak akan mirip seperti di blog ini.

Terima kasih.