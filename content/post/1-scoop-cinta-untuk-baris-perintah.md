---
title: Scoop, cinta untuk baris perintah
date: 2020-04-09T20:41:19+07:00
description:
  Sebuah baris-perintah manajemen paket aplikasi untuk Windows. Dengan segala kesederhanaan, keindahan dan kekuatan yang dimiliki. Para pengembang yang menggunakan Windows setidaknya harus mencoba mengenalnya. 
image: https://i.imgur.com/ZsNjkYx.png
category: Teknologi
tags:
  - Tools
  - Terminal
  - Scoop
---

Berapa banyak langkah yang kamu butuhkan untuk memasang perangkat lunak. Kamu berpikir sekedar klik tidaklah sesulit itu.

Namun pada akhirnya waktumu terbuang hanya untuk membuka halaman resmi, mengunduh dan memasang. Lalu menyesuaikan pengaturan setiap alat dan aplikasi jika diperlukan.

Mungkin kamu telah mengetahui Command Line Interface atau CLI. Tampilan baris perintah yang umumnya kamu gunakan melalui Command Prompt atau CMD.
Namun CMD... tidak sehebat itu. Kita sepakat saja, CMD itu payah.

Untuk menenagainya aku sempat mencoba [Chocolatey](https://chocolatey.org/) untuk menyiapkan lingkungan pengembang di Windows. Namun masih terasa ribet , jadi aku berhenti menggunakannya.

## Apa itu Scoop?

[**Scoop**](https://scoop.sh/) juga CLI pemasang untuk Windows. Scoop lebih sederhana dan indah, tepat seperti yang aku butuhkan. Aku pikir setiap pengembang yang menggunakan Windows sebagai sistem operasi utama mereka perlu mencoba Scoop.

Scoop sangat jujur dan terbuka, dia meletakkan semua paket aplikasi yang dipasang pada direktori `C:\Users\<nama pengguna>\Scoop`.

## Memasang Powershell 7

Untuk memasang Scoop, pastikan kamu memiliki PowerShell 5 dan dan .NET Framework 4.5 di Windowsmu. Untuk diketahui, Windows Powershell dan Powershell 5 ke atas itu berbeda, Windows Powershell terakhir versi 5.x dan sudah berakhir masa dukungannya dari Windows. Saat tulisan ini dibuat kini telah mencapai versi [PowerShell 7](https://aka.ms/powershell). Aku menyarankan untukmu mencoba memasangnya.

Untuk memasang PowerShell 7 kamu dapat mengunduh berkas pemasangnya di situs resmi menggunakan tautan yang aku berikan di atas. Tapi, hei kita ini sedang membahas CLI bukan?

1. Jika tidak ingin memasang PowerShell 7, langsung ke langkah ke-3.
1. Jalankan Windows PowerShell dengan akses Administrator. Lalu jalankan perintah berikut
    
    ```powershell
    iex "& { $(irm https://aka.ms/install-powershell.ps1) } -UseMSI -Quiet"
    ```
   
   Pemasangan ini akan memakan waktu, tergantung bagaimana koneksi internet kamu. Mungkin kamu dapat memperlebar jendela perintah untuk mengetahui prosesnya. Ketika selesai, kamu dapat melanjutkan ke langkah selanjutnya dengan membuka PowerShell 7.
   
## Memasang Scoop

Silakan buka Powershell dengan akses Administrator (untuk saay ini saja). Untuk tulisan ini aku akan menggunakan Powershell 7
   
1. Untuk menyiapkan pemasangan Scoop, ubah lebih dahulu kebijakan eksekusi menggunakan perintah

    ```powershell
    Set-ExecutionPolicy RemoteSigned -scope CurrentUser
    ```

1. Untuk memasang Scoop jalankan perintah

    ```powershell
    iwr -useb get.scoop.sh | iex
    ```
   
1. Tunggu sebentar dan Scoop siap dijalankan dengan perintah
    
    ```powershell
    scoop
    ```

## Memasang paket aplikasi

Pada PowerShell jalankan satu baris perintah.

```powershell
scoop install windows-terminal
```

Windows Terminal adalah aplikasi yang paling kusarankan untuk pengguna Windows. Dengan itu, kita akan membuat CLI menjadi kuat dan indah. Berikut adalah aplikasi yang aku langsung pasang setelah memasang Scoop

- windows-terminal
- 7zip
- curl
- git
- pshazz
- touch
- openssh

Tidak yakin apa aplikasi yang kamu butuh ada di Scoop? Cari dengan menjalankan

```powershell
scoop search ssh
```

Ingin melepas paket aplikasi? Jalankan satu baris ini

```powershell
scoop uninstall concfg
```

## Perawatan paket aplikasi

Saat kamu memiliki paket yang sehat terpasang, kamu menginginkan mereka selalu terkini. Scoop memiliki dukungan bawaan untuk memperbarui dirinya, serta semua paket yang terpasang.

Untuk memperbarui Scoop ke versi terbaru,

```powershell
scoop update
```

Untuk memperbarui semua aplikasi yang kamu pasang,

```powershell
scoop update *
```

## Pemasangan global

Ada hal menarik yang belum aku coba yaitu memasang aplikasi secara global. Aku belum mencobanya karena akun pengguna di Windowsku hanya satu.

Scoop memiliki bagian sudo yang tahu dengan pasti bagaimana ia bekerja.

```powershell
scoop install sudo
scoop update sudo
```

Sehingga kamu dapat menjalankan perintah menggunakan akses Administrator. Misalnya memasang Vim untuk semua pengguna yang ada di Windowsmu.

```powershell
sudo scoop install -g vim
```

Akan keluar peringatan perijinan, dan pemasangan akan dilanjutkan setelah kamu mengonfirmasi.

## Paket aplikasi gagal

Terkadang ketika kita melakukan pemasangan aplikasi, internet tidak stabil atau sesuatu membuat proses berhenti di tengah jalan. Hal ini akan menyebabkan scoop menganggap paket telah terpasang, namun ditandai sebagai paket gagal.

Kamu dapat mengeceknya menggunakan
```powershell
scoop list
``` 

Jika ini terjadi, cukup lepas dulu paketnya, lalu pasang kembali.

## Lain-lain

Jika kamu perlu mempelajari semua perintah Scoop cukup jalankan

```powershell
scoop help
scoop help install # untuk mengetahui opsi perintah install
```

Scoop bagiku begitu tangguh. Membuatku betah ngoding di Windows. Cobalah, aku yakin kamu akan menyukainya juga.
