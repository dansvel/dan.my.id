---
title: Blog milik Dan
subtitle: Catatan perjalanan setengah manusia
description: Hai, aku Dan. Setengah manusia yang tengah bepergian menuju entah ke mana dan belajar ini-itu sembari menikmati perjalanannya.
image: images/perjalanan-setengah-manusia.png
date: 2021-01-08
layout: beranda
---

<script>
  import { session } from '$app/stores';
  import { get } from 'svelte/store';
  import CatatanList from '$lib/CatatanList.svelte';
  import SeoHead from '$lib/SeoHead.svelte';

  const notes = get(session).notes;
</script>

<SeoHead />

<header>
  <h1>{title}</h1>
  <h2>{subtitle}</h2>

Hai, aku **Dan**. Setengah manusia yang tengah bepergian menuju entah ke mana dan belajar ini-itu sembari menikmati perjalanannya.

Beberapa hal menarik yang kualami dan kupelajari selama perjalanan akan ku catat di sini. Dan jika kamu menemukan sesuatu yang menyenangkan di sini, jangan sungkan untuk membagikannya, ya...

</header>

<CatatanList {notes} title="Catatan terbaru" />
<a sveltekit:prefetch href="/catatan?hal=2">Lebih banyak catatan</a>

<style lang="postcss">
  header {
    @apply mb-8 py-4;

    h1,
    h2 {
      @apply my-2 text-center leading-normal border-0;
    }
  }
  a {
    @apply float-right;
  }
</style>
