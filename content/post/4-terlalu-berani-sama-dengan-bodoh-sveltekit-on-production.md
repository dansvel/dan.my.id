---
title: Terlalu berani = bodoh? SvelteKit on Production
date: 2020-02-21T19:22:01+07:00
description: 
image: https://camo.githubusercontent.com/20e38db41f641f6797a43bc6fdba2169df8ceb0cf439170a94ff3fef66ee90b2/68747470733a2f2f6c61726176656c2e636f6d2f6173736574732f696d672f636f6d706f6e656e74732f6c6f676f2d76616c65742e737667
category: Teknologi
tags:
- Svelte
- highlight.js
- Javascript
- CSS
---

Jika kamu telah cukup mengamati, kamu akan sadar bahwa catatan ini adalah yang pertama di blog ini. Karena tiga catatan sebelumnya adalah catatan lawas yang sebenarnya telah aku tulis di blog lawasku yang saat ini telah lenyap. Sebenarnya aku mulanya berpikir untuk mengawali catatan ke-4 ini dengan semacam "Halo Dunia", namun aku merasa tidak punya cukup kalimat untuk ditulis di sana. Mungkin aku akan menuliskannya di catatan lain ke depannya.

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

Mulai dari preprocessor yang tidak terbaca, konfigurasi Snowpack yang terlewat. Ditambah API yang berubah dan belum ada dokumentasi, lengkaplah seperti orang menggunakan VR-headset mati sambil jalan-jalan.

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
   
Mungkin hanya itu yang aku ketahui, atau mungkin ada yang terlewat. Silakan menambahkan jika berkenan.