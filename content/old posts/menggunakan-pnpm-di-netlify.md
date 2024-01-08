---
title: Menggunakan PNPM di Netlify
date: 2021-09-29
description: PNPM itu keren, sayangnya Netlify belum menyediakannya secara default. Mari kita akalin.
category: Teknologi
tags: [Package manager, Deploy]
---

Aku menggunakan PNPM di laptopku untuk pengembangan, namun [Netlify hanya mendukung NPM, Yarn, dan Bower](https://docs.netlify.com/configure-builds/manage-dependencies/#javascript-dependencies) dan belum ada rencana menambahkan PNPM ke depannya.

## Yang dilakukan orang lain

Di sini https://www.seancdavis.com/blog/use-pnpm-with-netlify/ kamu dapat melihat bagaimana seseorang mencoba menanbahkan PNPM menggantikan NPM di Netlify. Aku telah mencobanya dan entah kenapa tidak berhasil melakukannya.

Yang dia lakukan di situ adalah men-disable NPM lalu menginstall PNPM ketika prebuild.

## Yang aku lakukan

Nah daripada melakukan hal tersebut, aku mengganti saja perintah `build` yang akan dieksekusi oleh Netlify dengan perintah berikut

```
pnpm build || ( npm install pnpm && pnpm build )
```

Kamu dapat mengganti perintah `build` di pengaturan _Build and Deploy_ atau jika kamu menggunakan `netlify.toml` maka kamu akan menuliskannya seperti berikut

```toml
[build]
command = "pnpm build || ( npm install pnpm && pnpm build )"
```

Kode tersebut akan mencoba menjalankan `pnpm build` terlebih dahulu. Jika gagal karena PNPM belum terinstall maka akan menginstall PNPM menggunakan NPM kemudian dilanjutkan dengan menjalankan `pnpm build` seperti biasa.

Mantap.
