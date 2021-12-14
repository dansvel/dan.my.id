---
title: Memasang Graphcomment di Svelte
date: 2021-04-01
description: Sebuah alternatif untuk sistem komentar yang mudah, sederhana dan ringan.
image: https://cdn.pixabay.com/photo/2019/04/25/00/35/german-4153622_960_720.jpg
category: Teknologi
tags:
  - Graphcomment
  - Sistem komentar
---

Sebelumnya aku telah menulis [catatan tentang Webmention](https://dan.my.id/6-komentar-blog-statis-dengan-webmention). Namun satu kekurangannya adalah, itu hanya dapat menggunakan satu Webmention untuk satu akun media sosial kita. Karena syaratnya akun kita itu harus mencantumkan alamat link ke web kita yang menggunakan Webmention.

## Sebuah alternatif

Graphcomment adalah penyedia layanan sistem komentar untuk web. Ini bersifat gratis. Yang kamu perlukan hanyalah sebuah akun di [graphcomment.com](https://graphcomment.com/), lalu memasang script untuk memanggil komponen komentar mereka.

Jika kamu ingin memasang di semacam Blogspot, maka cukup copy-paste saja kode yang diberikan di halaman dashboard Graphcomment kamu. Jika di Svelte, maka yang kamu butuhkan hanya sebuah komponen `src/lib/Graphcomment.svelte`

```sveltehtml
<script type="text/javascript">
  import { browser } from '$app/env'
  if (browser) {
    window.gc_params = {
      graphcomment_id: 'id-graphcomment-web-kamu',
      fixed_header_height: 75 // kalo menggunakan fixed header
    }
  }
</script>

<svelte:head>
  <script src={`https://graphcomment.com/js/integration.js?${Date.now()}`} async></script>
</svelte:head>

<div id="graphcomment" />
```

Mudah bukan?
