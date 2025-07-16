---
title: Valet untuk windows
created: 2020-10-03
description: Lingkungan pengembang PHP dari Laravel awalnya hanya tersedia untuk MacOS. Seseorang telah melakukannya sejak lawas, kini kamu dapat memasangnya pada Windows kesayanganmu.
translation: null
tags: [PHP, Laravel, Valet]
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

Atau kamu dapat mengikuti cara paling ~~malas~~ mudah yang aku berikan, pasang [menggunakan **Scoop**](/catatan/scoop-cinta-untuk-baris-perintah) dengan menjalankan satu baris perintah berikut pada PowerShell:

```powershell
scoop install php composer
```

Oh iya, pastikan port 80 dan 9001 tidak sedang digunakan.

Port 80 biasanya digunakan oleh paket modul seperti yang aku sebutkan di atas, Laragon juga menggunakan ini. Jadi jika paket modul yang kamu gunakan diatur sebagai _services_ maka silakan dinon-aktifkan lebih dahulu

port 9001 nantinya digunakan oleh AcrylicDNS sebagai _proxy_. Awalnya aku kesulitan memasang karena ternyata port ini telah digunakan oleh salah satu _service_ Intel. Aku tidak tahu yang mana, jadi aku mematikan semuanya melalui msconfig.

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

1. Untuk menjalankan konfigurasi dan memasang Valet sebagai _service_, jalankan:

   ```powershell
   sudo valet install
   ```

   Jika ada peringatan jawab saja dengan _Yes_

   Jika kamu tidak menggunakan Scoop dan tidak dapat melakukan `sudo`, maka kamu perlu menjalankan PowerShell sebagai Administrator lalu jalankan `valet install`.

Dan pemasangan Valet selesai. Namun kita belum lah selesai.

## Pengaturan Windows

Ini wajib dilakukan supaya kita dapat menggunakan domain **.test** tanpa mengubah berkas _host_ milik Windows.

Yang perlu kamu lakukan adalah mengubah pengaturan DNS pada perangkat jaringan apapun yang kamu gunakan, baik itu LAN, WiFi, ataupun Tether smarpthone yang ada di komputermu menjadi :

primary `127.0.0.1`
secondary `1.0.0.1` (atau dns lain yang kamu gunakan).

## Loopback Adapter

Perangkat jaringan virtual ini digunakan sebagai Loopback, jadi meskipun kamu tidak tersambung ke internet, kamu tetap dapat menggunakan domain **.test**

Jika belum memilikinya, kamu dapat menambahkannya dengan menjalankan **Hardawe Wizard**

- `Start` + `R` pada papan ketik
- Pada jendela **Run** ketikkan `hdwwiz` lalu tekan `Enter`, jika ada peringatan pilih **Yes**
- **Next**, lalu pilih _blablabla install manualy (advance)_, **Next**
- Pilih **Network Adapter**, **Next**
- Pada bagian kiri pilih _Microsoft_, pada bagian kanan pilih _blablabla Loopback Adapter_, **Next**
- **Finish**

Untuk Loopback Adapter-nya kamu ubah DNS menjadi :

IPv4 ke `127.0.0.1`.
IPv6 ke `::1`

Putuskan jaringan, buka browser, tuju `localhost`. Jika kamu melihat `error 404` maka itu saja, dan kamu dapat menggunakan Valet seperti yang telah kamu impikan.

## Menggunakan Valet

Pada terminal pindah menuju direktori yang akan kamu gunakan sebagai _tempat parkir_ proyek PHP kamu. Lalu _parkirkan_ Valet di situ

```powershell
valet park
```

Jika kamu salah _parkir_, lupakan saja

```powershell
valet forget
```

Atau jika kamu ingin menambahkan proyek PHP dari tempat lain, pindah ke direktori lalu jalankan.

```powershell
valet link
```

### Contoh: menggunakan Valet untuk Laravel

Menyiapkan pemasangan Laravel

```powershell
composer global require "laravel/installer"
```

Di dalam _tempat parkir_ jalankan

```powershell
laravel new aplikasi
```

Buka browser, lalu tuju http://aplikasi.test, dan sampai jumpa lain waktu.

## Pengaturan php.ini di valet windows

Kamu dapat mengecek apakah php kamu menggunakan `php.ini` dengan mengetikkan perintah berikut pada terminal

```powershell
php --ini
```

Cek bagian **Loaded Configuration File:**

PHP secara bawaan menggunakan `C:\Windows\php.ini` untuk konfigurasinya. Jika saja kamu telah memilikinya di tempat lain, misal pada Scoop. Maka kamu dapat sekedar membuat symlink (symbolic link) untuk menyelesaikan masalah ini

```powershell
sudo New-Item -Path C:\Windows\php.ini -ItemType SymbolicLink -Value C:\Users\akunmu\scoop\persist\php\myini\php.ini

sudo valet restrat ## restart valet

php --ini ## cek kembali
```
