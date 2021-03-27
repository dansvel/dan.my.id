---
title: Valet untuk windows
date: 2020-10-03
description: Lingkungan pengembang PHP dari Laravel awalnya hanya tersedia untuk MacOS. Seseorang telah melakukannya sejak lawas, kini kamu dapat memasangnya pada Windows kesayanganmu.  
image: https://camo.githubusercontent.com/20e38db41f641f6797a43bc6fdba2169df8ceb0cf439170a94ff3fef66ee90b2/68747470733a2f2f6c61726176656c2e636f6d2f6173736574732f696d672f636f6d706f6e656e74732f6c6f676f2d76616c65742e737667
category: Teknologi
tags: 
  - Tools
  - Valet
  - Laravel
  - PHP
---

Sudah hampir pertengahan tahun 2020, dan kamu masih menggunakan paket modul untuk pengembangan proyek PHP-mu? **WAMPP** dan, **XAMPP** itu sudah ketinggalan jaman. Cobalah ganti ke [**Laragon**](https://laragon.org/).

Atau lebih baik, gunakan **Valet**.

Aku juga sebelumnya menggunakan Laragon, tidak ada masalah dengan itu. Ini murni rasa penasaran aku, iseng mencoba, lalu kucatat di sini.

## Apa itu Valet?

Valet adalah lingkungan pengembang dari Laravel. Itu menggunakan **Nginx** untuk servernya dan **AcrylicDNS** untuk mem-proxy permintaan http menjadi domain **.test**

Namun tidak hanya untuk Laravel. Valet juga mendukung macam-macam proyek PHP seperti:

- Lumen
- Drupal
- CakePHP
- Magento
- Symfony
- WordPress
- Joomla
- Zend
- dan lain-lain

## Prasyarat

Sebelum kita mulai, kamu perlu memastikan [**PHP** terbaru](http://windows.php.net/download) dan [**Composer**](https://getcomposer.org/) telah terpasang di Windows milikmu. Jika belum, kamu dapat memasangnya dengan cara yang kamu tahu atau kamu anggap nyaman. 

Atau kamu dapat mengikuti cara paling ~~malas~~ mudah yang aku berikan, pasang [menggunakan **Scoop**](https://ngodwin.netlify.app/posts/1-cinta-untuk-baris-perintah) dengan menjalankan satu baris perintah berikut pada PowerShell:

```powershell
scoop install php composer
```

Oh iya, pastikan port 80 dan 9001 tidak sedang digunakan. 

Port 80 biasanya digunakan oleh paket modul seperti yang aku sebutkan di atas, Laragon juga menggunakan ini. Jadi jika paket modul yang kamu gunakan diatur sebagai *services* maka silakan dinon-aktifkan lebih dahulu

port 9001 nantinya digunakan oleh AcrylicDNS sebagai *proxy*. Awalnya aku kesulitan memasang karena ternyata port ini telah digunakan oleh salah satu *service* Intel. Aku tidak tahu yang mana, jadi aku mematikan semuanya melalui msconfig.

OK, lalu restart. Masalah port 9001 kemungkinan akan diatasi pada versi berikutnya.

## Pemasangan Valet

Memang Valet awalnya diciptakan untuk MacOS, namun kita dapat menggunakan paket pihak ketiga yang bernama [valet-windows](https://github.com/cretueusebiu/valet-windows).

1. Buka PowerShell, pasang Valet secara global dengan menjalankan:

    ```powershell
    composer global require cretueusebiu/valet-windows 
    ```

1. Secara bawaan, AcrylicDNS akan menggunakan DNS Google. Jika kamu menggunakan DNS lain, kamu dapat mengubah pengaturannya pada berkas `AcrylicConfiguration.ini` yang terletak di direktori vendor Composer. 
    
    Jika kamu menggunakan Scoop, maka letakknya ada di `C:\Users\usermu\scoop\persist\composer\home\vendor\cretueusebiu\valet-windows\bin\acrylic\AcrylicConfiguration.ini`
    
    Ubah sesuai dengan DNS yang kamu gunakan pada 
    
    - baris 11 `PrimaryServerAddress=1.1.1.1`
    - baris 54 `SecondaryServerAddress=1.0.0.1`
    
    Disarankan mengubah pengaturan berikut
    
    - baris 271 `LocalIPv4BindingAddress=127.0.0.1`
    - baris 284 `LocalIPv6BindingAddress=::1`
    
1. Untuk menjalankan konfigurasi dan memasang Valet sebagai *service*, jalankan:
    
    ```powershell
    sudo valet install
    ```
   
   Jika ada peringatan jawab saja dengan *Yes*
  
   Jika kamu tidak menggunakan Scoop dan tidak dapat melakukan `sudo`, maka kamu perlu menjalankan PowerShell sebagai Administrator lalu jalankan `valet install`.
   
Dan pemasangan Valet selesai. Namun kita belum lah selesai.

## Pengaturan Windows

Ini wajib dilakukan supaya kita dapat menggunakan domain **.test** tanpa mengubah berkas *host* milik Windows.

Yang perlu kamu lakukan adalah mengubah pengaturan IP dan DNS pada perangkat jaringan virtual yang ada di komputermu menjadi `127.0.0.1`. Perangkat jaringan virtual ini digunakan sebagai Loopback, jadi meskipun kamu tidak tersambung ke internet, kamu tetap dapat menggunakan domain **.test**

Perangkat jaringan ini adalah selain kartu LAN dan Wifi Adapter. Kamu dapat menambahkannya dengan menjalankan **Hardawe Wizard** 

- `Start` + `R` pada papan ketik
- Pada jendela **Run** ketikkan `hdwwiz` lalu tekan `Enter`, jika ada peringatan pilih **Yes**
- **Next**, lalu pilih  *blablabla install manualy (advance)*, **Next**
- Pilih **Network Adapter**, **Next**
- Pada bagian kiri pilih *Microsoft*, pada bagian kanan pilih *blablabla Loopback Adapter*, **Next**
- **Finish**

Untuk Kartu LAN dan Wifi Adapter, kamu dapat membiarkan pengaturan IP-nya namun arahkan DNS-nya ke `127.0.0.1`. Untuk Loopback Adapter-nya kamu dapat atur seperti ini

Putuskan jaringan, buka browser, tuju `localhost`. Jika kamu melihat **It Works** maka itu saja, dan kamu dapat menggunakan Valet seperti yang telah kamu impikan.

## Menggunakan Valet

Pada terminal pindah menuju direktori yang akan kamu gunakan sebagai *tempat parkir* proyek PHP kamu.

```powershell
cd ~        # menuju C:\Users\usermu
mkdir www   # membuat direktori www
cd www      # berpindah direktori
```

Lalu *parkirkan* Valet di situ

```powershell
valet park
```

Jika kamu salah *parkir*, lupakan saja

```powershell
valet forget
```

Atau jika kamu ingin menambahkan proyek PHP dari tempat lain, pindah ke direktori lalu jalankan 

```powershell
cd C:\xampp\htdocs\bloggw
valet link
```

### Contoh: menggunakan Valet untuk Laravel

Menyiapkan pemasangan Laravel

```powershell
composer global require "laravel/installer"
```

Di dalam *tempat parkir* jalankan
```powershell
laravel new aplikasi
```

Buka browser, lalu tuju http://aplikasi.test, dan sampai jumpa lain waktu.
