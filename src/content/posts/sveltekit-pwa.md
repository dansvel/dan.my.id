---
title: SvelteKit PWA
date: 2021-09-14
description: Supaya aplikasi web dapat diinstall di mana pun.
category: Teknologi
tags: [PWA, Svelte, Service Worker]
---

Aku memang belum begitu banyak membuat aplikasi web. Namun SvelteKit benar-benar memudahkanku.

Jadi mari anggap bahwa kamu telah selesai membuat sebuah WebApp menggunakan SvelteKit. Selamat! 🎉

Sekarang mari mulai menjadikannya PWA

## Bahan dasar PWA

- Aplikasi web (blog/web biasa juga bisa lho)
- manifest.json (untuk icon, nama, dll)
- service-worker (supaya aplikasi bisa offline)

## Buat aplikasi webnya

Tentu saja, kan? Aku tidak akan membahasnya disini.

## manifest.json

Buat file `/static/manifest.json`

```json
{
  "name": "Aplikasi ramalan cuaca",
  "short_name": "Cuaca gimana",
  "description": "Melihat cuaca seperti seolah anda adalah dukun",
  "lang": "id",
  "categories": ["education", "utilities"],
  "background_color": "#18181b",
  "theme_color": "#71717a",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "logo_512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "shortcuts": [
    {
      "name": "Bagaimana cuaca hari ini?",
      "short_name": "Hari ini",
      "description": "Lihat apakah hari ini akan cerah atau hujan",
      "url": "/today?source=pwa",
      "icons": [
        {
          "src": "/icons/logo_192.png",
          "sizes": "192x192"
        }
      ]
    },
    {
      "name": "Bagaimana cuaca besok?",
      "short_name": "Besok",
      "description": "Lihat ramalan cuaca untuk besok",
      "url": "/tomorrow?source=pwa",
      "icons": [
        {
          "src": "/icons/logo_192.png",
          "sizes": "192x192"
        }
      ]
    }
  ]
}
```

Kamu dapat mengustomisasi sendiri bagaimana isinya. Lebih lengkap tentang manifest.json, kamu dapat mengunjungi https://web.dev/add-manifest/

Jangan lupa untuk memanggil file manifest dari `/src/app.html` di antara tag `head`

```html
<link rel="manifest" href="manifest.json" />
```

## service-worker

Buat file `/src/service-worker.js`

```js
import { build, timestamp } from '$service-worker'
const CACHE_NAME = `WebApp-cache-${timestamp}`

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(build)))
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(async cacheNames => {
      for (const cacheName of cacheNames) {
        if (cacheName !== CACHE_NAME) {
          await caches.delete(cacheName)
        }
      }
      await self.clients.claim()
    })
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    (async function () {
      const cache = await caches.open(CACHE_NAME)
      const cachedResponse = await cache.match(event.request)
      try {
        const fetchPromise = fetch(event.request)
        const networkResponse = await fetchPromise
        await cache.put(event.request, networkResponse.clone())
        return cachedResponse || networkResponse
      } catch (e) {
        return cachedResponse
      }
    })()
  )
})
```

File tersebut hanya akan bekerja dalam mode production, jadi itu akan dibuild pada saat kamu melakukan perintah `npm run build`

Teknik yang digunakan service-worker di atas adalah yang paling sederhana, yaitu cache-first

Jadi awalnya itu akan mengambil cache lalu memberikannya, baru kemudian meminta pembaruan untuk disimpan. Pembaruan akan disajikan di permintaan berikutnya.

Hasilnya kira-kira seperti ini

![Install PWA](https://hana.rip/dist/img/memasang-di-pc-2.png)
