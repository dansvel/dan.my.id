---
title: Terlalu berani = bodoh? SvelteKit on Production
date: 2020-02-21T19:22:01+07:00
description: Blog yang dibuat menggunakan teknologi yang belum kelar. Antara penasaran dan nekat sudah seperti tetangga. Pengalaman memang guru yang berharga, namun akan bijak jika kamu belajar dari pengalaman orang-orang nekat ini.
image: https://pbs.twimg.com/media/El9fOLpVoAAF5u-.jpg
category: Teknologi
tags:
- Svelte
- highlight.js
- Javascript
- CSS
---

Jika kamu telah cukup mengamati, kamu akan sadar bahwa catatan ini adalah yang pertama di blog ini. Karena tiga catatan sebelumnya adalah catatan lawas yang sebenarnya telah aku tulis di blog lawasku yang saat ini telah lenyap.

Mulanya aku berpikir untuk mengawali catatan ke-4 ini dengan semacam "Halo Dunia", namun aku merasa tidak punya cukup kalimat untuk ditulis di sana. Mungkin aku akan menuliskannya di catatan lain ke depannya.

Mari ke pokok bahasan.

## svelte@next alias SvelteKit

Pada saat catatn ini ditulis, SvelteKit masih belum secara resmi dirilis, bahkan belum versi alpha. Namun kelezatannya sudah dapat **dicicipi** menggunakan perintah

```powershell
pnpm init svelte@next sveltest // sveltest adalah nama direktori untuk mencicipi sveltekit ini
cd sveltest
pnpm run dev 
```

*`pnpm` dapat diganti dengan `npm` atau `yarn` sesuai selera.

Bayangkan saja om-om mau jualan nasi goreng dan sedang belajar membuat resepnya sendiri. Dia bahkan belum punya warung, namun tentu saja nasi goreng hasil latihannya sudah ada. Nah banyak juga ternyata yang doyan sama ini. Mungkin kurang asin, mungkin terlalu banyak sambal, dan lain sebaginya. Bagaimana pun, itu nasi goreng.

Para pengembang web juga mengerumuni proyek dalam masa pengembangan ini dengan antusias. Dengan masih munculnya bug di sana-sini, ada saja yang nekat menggunakannya di *production*. 

Ya aku ini contohnya.

Entah mereka ini calon ilmuan yang tidak kesampaian sehingga *demen* coba-coba. Atau cuma orang nekat yang bodoh.

## Kendala

Jika setiap bug yang ada ibarat rasa gatal di kulit, maka seharusnya aku tidak dapat tidur saat ini.

Mulai dari preprocessor yang tidak terbaca, konfigurasi Snowpack yang terlewat, dan bug di Windows. Ditambah API yang berubah dan belum ada dokumentasi, lengkaplah seperti orang menggunakan VR-headset mati sambil jalan-jalan.

## Contekan

Seperti yang telah diketahui, SvelteKit adalah pengembangan dari Sapper. Jadi API yang digunakan juga kebanyakan berasal dari sana, hanya sedikit diubah lalu dikembangakan. Barangkali saja ada yang sebodoh aku, inilah contekan sementara untuk SvelteKit saat ini

1. `preload()` telah diganti menjadi `load()`
    ```js
    export async function load({ fetch, session, page, context }) {
        const post = await fetch(`${page.params.slug}.json`);
        return post.ok
            ? { props: { post: await post.json() } }
            : {
                status: 404,
                error: new Error('Tidak ada catatan seperti itu disini'),
            };
    }
    ```
   
   Return lain
   
   ```js
   return {
      redirect: {
        status: 302,
        to: "/",
      },
    };
   
   return {
      status: 402,
      error: new Error("Unauthorized."),
    };
   ```
   
2. API lain dari sapper
   ```js
   import { goto, prefetch, prefetchRoutes } from '$app/navigation';
   import { page, session, navigating } from '$app/stores';
   ```
   
3. Gunakan [`not-svelte-kit`](https://github.com/GrygrFlzr/not-svelte-kit) jika kamu mengembangkan SvelteKit di lingkungan sistem operasi Windows, karena ketika catatan ini ditulis masih terdapat masalah dengan ESM atau semacamnya. Saat ini aku hanya menggunakannya untuk menjalankan perintah `pnpm run dev`, karena proses buildnya tidak ada masalah dan telah ditangani langsung di netlify.
   
Mungkin hanya itu yang aku ketahui, atau mungkin ada yang terlewat. Silakan menambahkan jika berkenan.