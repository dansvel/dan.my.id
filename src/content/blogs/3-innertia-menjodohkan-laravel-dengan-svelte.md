---
title: Inertia, menjodohkan Laravel dengan Svelte
date: 2020-11-19
description: Mempertemukan back-end dan front-end favoritmu menggunakan Inertia. Membuat SPA tanpa mengkhawatirkan kerumitan router pada front-end.
category: Teknologi
tags: [Framework, Laravel, Inertia, Svelte]
---

Aku mengenal pemrograman web dari PHP dan MysQL. Mencoba ke framework, aku mengenal Laravel. Catatan ini bermula ketika mengenal [Svelte](https://svelte.dev/) dan kecantikannya, lalu jatuh cinta pada pandangan pertama. Ehem. Namun aku belum cukup memahami Javascript jika harus menggunakan [Sapper](https://sapper.svelte.dev/) untuk proyekku.

Jadi setelah mencari kesana-kemari, mencoba semua cara yang aku temukan di jagad maya. Jumpalah aku dengan [**Inertia**](https://inertiajs.com/).'

> saat tulisan ini dibuat, versi yang digunakan adalah Laravel 7 dan Svelte 3.x.
>
> Teknis konfigurasi sangat mungkin untuk berubah di versi yang lebih baru, sangat disarankan untuk mengikuti dokumentasi resmi di situs Inertia

## Apa sih Inertia itu?

Inertia memperbolehkanmu membuat Single-page Apps (SPA) tanpa perlu membangun sebuah API. Yang berarti kamu tidak perlu repot dengan hal rumit semacam routing dan API.

Sepemahamanku, seluruh API dan routing akan tetap menggunakan sisi-server, yang akan diarahkan ke adapter inertia. Lalu Inertia mengubahnya menjadi permintaan XHR dan melemparnya ke sisi-client.

Dengan Laravel yang aku baru pelajari beberapa minggu, aku akan cukup mampu menggunakannya. Sederhananya, yang aku butuhkan hanyalah Laravel _controller_ untuk mengolah data dari basis data dan Svelte _component_ untuk reaktifitas data dan merespon masukkan pengguna dengan sedikit Javascript.

## Resepsi

Inertia dapat digunakan hampir untuk semua back-end seperti Rails, Symfony, Yii2. Front-end yang didukung ada, React, Vue. Dan framework lain yang adapternya dikembangkan oleh komunitas.

Namun kali ini aku hanya akan mengawinkan Laravel dan Svelte disini.

### Sisi Server

1. Siapkan aplikasi Laravel, atau gunakan yang sudah kamu punya.

   ```powershell
   laravel new aplikasi
   cd aplikasi
   ```

1. Tambahkan Inertia menggunakan composer.

   ```shell
   composer require inertiajs/inertia-laravel
   ```

1. Atur supaya Laravel Blade menjalankan Inertia.

   `resources/views/app.blade.php`

   ```html
   <!DOCTYPE html>
   <html>
     <head>
       <meta charset="utf-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
       <link href="{{ mix('/css/app.css') }}" rel="stylesheet" />
       <script src="{{ mix('/js/app.js') }}" defer></script>
     </head>
     <body>
       @inertia
     </body>
   </html>
   ```

1. Asset Versioning

   Ini tujuannya supaya Inertia melakukan building setiap kali isi dari asset berubah.

   `app/Providers/AppServiceProvider.php`

   ```php
   <?php

   namespace App\Providers;

   use Illuminate\Support\ServiceProvider;
   use Inertia\Inertia;

   class AppServiceProvider extends ServiceProvider
   {
       public function register()
       {
           //
       }

       public function boot()
       {
           Inertia::version(function () {
               return md5_file(public_path('mix-manifest.json'));
           });
       }
   }
   ```

### Sisi Client

1. Tambahkan package yang dibutuhkan

   ```powershell
   npm install @inertiajs/inertia @inertiajs/inertia-svelte
   npm install @babel/plugin-syntax-dynamic-import laravel-mix-svelte
   ```

1. Code splitting biasa digunakan oleh framework, kamu memerlukan babel untuk ini.

   buat file `.babelrc` berisi

   ```json
   {
     "plugins": ["@babel/plugin-syntax-dynamic-import"]
   }
   ```

1. Inisialisasi main javascript

   `resources/js/app.js`

   ```js
   import { InertiaApp } from '@inertiajs/inertia-svelte'

   const app = document.getElementById('app')

   new InertiaApp({
     target: app,
     props: {
       initialPage: JSON.parse(app.dataset.page),
       resolveComponent: name => import(`./Pages/${name}.svelte`).then(module => module.default),
     },
   })
   ```

1. Konfigurasi script building

   Aku menggunakan laravel-mix ditambah laravel-mix-svelte

   `webpack.mix.js`

   ```js
   const mix = require('laravel-mix')
   require('laravel-mix-svelte')

   mix
     .js('resources/js/app.js', 'public/js')
     .sass('resources/sass/app.scss', 'public/dist')
     .svelte({
       dev: !mix.inProduction(),
     })
     .webpackConfig({
       output: { chunkFilename: 'js/[name].js?id=[chunkhash]' },
     })
     .version()
   ```

## Menggunakan Laravel dan Svelte

Untuk bagian data PHP, kamu dapat membuat controller seperti biasa

```php
class UsersController extends Controller
{
    public function index()
    {
        return Inertia::render('Users/Index', [
            'users' => User::all()->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'edit_url' => URL::route('users.edit', $user),
                ];
            }),
            'create_url' => URL::route('users.create'),
        ]);
    }
}
```

Untuk bagian Svelte, kamu dapat membuat view berekstensi `.svelte` di dalam direktori `resources/js/Pages` sesuai dengan yang tadi di atur pada inisialisasi.

`resources/js/Pages/User/Index.svelte`

```sveltehtml
<script>
  import Layout from './Layout.svelte'

  export let user
</script>

<Layout>
  <svelte:head>
    <title>Welcome</title>
  </svelte:head>
  <H1>Welcome</H1>
  <p>Hello {user.name}, welcome to your first Inertia app!</p>
</Layout>
```

Terakhir tinggal di-build saja. Karena kita telah menggunakan [Valet di Windows](/catatan/2-valet-untuk-windows), maka yang perlu dilakukan hanya

```powershell
npm install && npm run dev
```

Lalu tuju `aplikasi.test` pada peramban.

Untuk piring panasnya bisa langsung ditusuk garpu di [dansvel/laravel-svelte](https://github.com/dansvel/laravel-svelte)

Untuk konsepnya, aku membuat proyek iseng-iseng semacam e-Voting untuk Pemilihan Ketua Osis di [dansvel/epilketos-laravel-svelte-0.0](https://github.com/dansvel/epilketos-laravel-svelte-0.0)

Itu saja untuk saat ini, sampai jumpa lagi.
