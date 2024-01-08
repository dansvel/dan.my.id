---
title: Perulangan menggunakan `array.map()` alih-alih `for..in` maupun `for..of` di Javascript
date: 2022-05-20
description: Mengurangi sedikit waktu eksekusi kode perulangan dengan beralih ke `array.map()`
category: Teknologi
tags: [Javascript]
---

Berikut adalah [sumber](https://leanylabs.com/blog/js-forEach-map-reduce-vs-for-for_of/#arrayforeach-vs-for-and-forof) yang mengatakan `array.map()` lebih cepat ketimbang perulangan `for`

## Perulangan untuk setiap elemen dalam array

```js
const array = ['a', 's', 'd', 'f']

for (const index in array) {
	/* ... */
}
for (const element of array) {
	/* ... */
}

array.map(element => {
	/* ... */
})
array.map((element, index) => {
	/* ... */
})
array.map((element, index, array) => {
	/* ... */
})
```

## Perulangan sebanyak n

```js
for (let i = 0; i < 5; i++) {
	/* ... */
}

;[...Array(5)].map((_, i) => {
	/* ... */
})
```

## Begitulah

Fungsi bawaan Array sebenarnya masih banyak, mungkin nanti bisa dibahas di catatan lainnya. Terima kasih.
