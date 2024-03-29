---
title: Aku membuat aplikasi transliterasi aksara Jawa
date: 2021-03-31
description: Mengubah teks huruf alfabet menjadi aksara Jawa jadi mudah.
category: Teknologi
tags: [Aplikasi, Svelte, Aksara, Jawa]
---

<script>
import Youtube from '$lib/component/Youtube.svelte'
</script>

Awalnya aku menulis aksara Jawa di laptop menggunakan papan ketik bawaan dari _Windows 10_, aku hanya memasangnya lalu menggunakannya dengan menekan `Win` + `.`. Itu sudah berlangsung satu tahun lebih.

Memang sih aku telah menemukan aplikasi semacam ini di internet, namun hasilnya kurang memuaskanku. Hingga aku bertemu Svelte.

## Bagaimana aku membuat aplikasi ini

Aku hanya menggunakan _regex_ sederhana yang awalnya aku ujicoba di situs https://regex101.com/. Regex ini untuk membagi menjadi suku kata. Jika kamu membuka situsnya, kamu dapat mencoba bagaiman regex ini membagi suku kata

```text
/([hncrkdtswlpðjyɲmgbθŋxɠʣʃfvzq]{1,3})?[aeéiuo]([hncrkdtswlpðjyɲmgbθŋxɠʣʃfvzq](?![aeéiuo]|([rylw])))?|[0-9]+|\n|\s\s|\(|\)|:|"|,|\.|á|(?:\[.*])/gim
```

Masih banyak kekurangan dari regex ini, karena sementara ini hanya berpatokan pada "suku kata pasti memiliki sebuah huruf vokal".

Lalu dari hasil regex berbentuk array tadi, aku konversi setiap hurufnya dengan algoritma sederhana yang dapat kamu cek sendiri di github. Misalnya, kapan harus menggunakan aksara, kapan harus menggunakan tanda, bagaimana menangani huruf mati, dan sebagainya.

Karena tujuannya hanya itu, jadi aku terlalu malas mendesain aplikasinya, lalu hanya kutambahkan halaman petunjuk dan halaman tentang.

## Aplikasinya bernama **Hana**

<Youtube id="dl-vxkR81S8"/>

Langsung saja coba aplikasinya di dengan mengunjungi situs https://hana.js.org/

Dan jangan lupa untuk memberi masukkan jika ada kesalahan hasil atau ide bagaimana harusnya aplikasi supaya nyaman digunakan.

Terima kasih.
