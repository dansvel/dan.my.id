---
title: node cli sederhana untuk membuat postingan baru
date: 2022-05-22
description: Mencoba menggunakan commander
category: teknologi
tags: [cli, node.js]
---

Hai, seperti yang kalian ketahui, blog ini menggunakan SvelteKit dan berbasis markdown. Alasannya karena mudah dan sederhana.

Jadi yang paling sering dilakukan ketika membuat catatan baru adalah:

1. Membuat file markdown di folder yang konten, dengan slug url sebagai nama file-nya. Yaitu huruf kecil semua, tidak ada karakter lain selain huruf, angka, dan tanda strip.
2. Menuliskan fronmatter, yang selalu sama. Berisi judul, deskripsi, tanggal, label, dan sebagainya

Meskipun hanya dua hal, tapi menurutku itu merepotkan sekali, kupikir "mari buat menjadi lebih sederhaa"

## Node CLI

Command Line Interface, dalam bahasa Indonesia menjadi: antarmuka perintah berbasis teks. Yaitu kamu cukum mengetikan sebuah baris perintah untuk yang ingin dilakukan. Dalam hal ini, membuat file postingan baru.

nodejs secara bawaaan sudah dapat mangani ini dengan argv. Jadi ketika kamu mengetikkan

```shell
node perintah.js halo
```

kamu dapat mengakses halo dan apapun setelahnya dengan file bernama `perintah.js` yang berisi kode seperti berikut

```js
import { argv, exit } from 'process'

// perintah yang dibuat
const commands = ['new']

// pengeceka jika salah mengetikkan perintah
if (!commands.includes(argv[2])) {
  console.log('perintah', argv[2], 'tidak ada')
  exit()
}

// if untuk setiap perintah
if (argv[2] === 'halo') {
  // kerjakan sesuatu
  console.log('halo dunia')
}
```

## commander

Menambahkan commander ke proyek js kita

```shell
npm install commander
```

ah karena cli-nya nanti untuk membuat postingan, maka kita namakan `buat.js`

```js
import fs from 'fs'
import { Command } from 'commander'

export const slugging = text => {
  return text
    .toLowerCase()
    .replace(/ {2,}/g, ' ')
    .replace(/[^a-zA-Z0-9]/g, '-')
}

const postsPath = './src/content/posts'

const template = `---
title: {title}
date: yyyy-mm-dd
description: string
category: manusia|teknologi
tags: [string]
---

Hai, `

const program = new Command()

program
  .command('postingan')
  .description('buat postingan baru')
  .argument('<judulnya>', 'judulnya')
  .action(judulnya => {
    const filename = slugging(judulnya) + '.md'

    const files = fs.readdirSync(postsPath)
    const exist = files.filter(file => file === filename)

    if (exist.length) program.error('postingan sudah ada, silahkan beri judul yang berbeda')

    const content = template.replace('{title}', judulnya.replace(/ {2,}/g, ' '))
    fs.writeFileSync(postsPath + '/' + filename, content)
    console.log('silakan mulai menulis di:', postsPath + '/' + filename)
  })

program.parse()
```

Wokeh,,

- `fs` digunakan untuk interaksi file dan folder menggunakan nodejs.
- lalu panggil `commander`nya
- fungsi membuat slug sederhana
- siapkan lokasi folder tempat menyimpan file markdown postingan
- siapkan template fronmatternya, dan isi komtennya kalau perlu
- variable program disiapkan barangkali dibutuhkan untuk membuat perintah lebih dari satu
- perintah yang kita buat bernama `postingan`
- berikan deskripsi, argumen, dan option (kalau perlu) sesuai kebutuhan
- lalu apa aksi yang dilakukan dari perintah yang kita buat, yaitu
  - menyiapkan nama file, dengan slugging dan ekstensi
  - membaca isi folder
  - lalu cek apakah file yang ingin dibuat sudah ada
  - `program.error()` akan menghentikan aksi dan menampilkan pesan error
  - ganti `{title}` yang ada ditemplate dengan yang dari perintah
  - buat dan tulis file markdownnya
  - dan selesai

Jalankan dengan mengetikkan

```shell
node buat postingan 'Halo Dunia'
```

Maka akan membuat file `./src/content/posts/halo-dunia.md`

Fiuh...

Jika argumen atau option lebih dari satu kata, maka apit dengan tanda petik.
