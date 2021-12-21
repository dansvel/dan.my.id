---
title: Membuat hybrid NPM module untuk CommonJS dan ESM 
date: 2021-12-16 
description: Satu kode yang sama dapat digunakan pada 2 jenis javascript yang berbeda 
category: Teknologi 
tags:
  - NPM Module
---

Seperti yang telah diketahui, kode untuk menggunakan NPM module adalah seperti berikut

```js
// CJS
const markdown = require('@dansvel/vite-plugin-markdown')

// ESM
import markdown from '@dansvel/vite-plugin-markdown'
```

Jadi supaya dapat digunakan dengan baik, module yang kamu buat harus mengexport dengan benar sesuai dengan
peruntukkannya.

```js
// CJS
exports.default = pluginBuatanMu()

// ESM
export default pluginBuatanMu()
```

Mungkin awalnya kamu berfikir, tidak masalah untuk mengexport keduanya dalam satu file yang sama seperti ini

```js
const pluginBuatanMu = () => {
  return 'halo dunia'
}

exports.default = pluginBuatanMu()
export default pluginBuatanMu()
```

## Masalahnya adalah

Jika pluginmu menggunakan module pihak ketiga. Mau tidak mau di dalam kodemu harus mengimport dengan salah satu cara
yang telah dijelaskan di atas.

```js
// ini misal saja
import kapitalHurufPertama from 'kapital-huruf-pertama'

const pluginBuatanMu = () => {
  return kapitalHurufPertama('halo dunia')
}

exports.default = pluginBuatanMu()
export default pluginBuatanMu()
```

Nah, misal kamu menggunakan import versi ESM maka tidak dapat dong pluginmu nanti digunakan untuk CJS, begitu pun
sebaliknya.

Sebenarnya kamu dapat membuat dua file kode pluginmu dengan ekstensi `.mjs` dan `.cjs`, tapi ayolah.

## Solusi

1. Tulis kode mu satu kali saja di dalam folder `src` menggunakan ES6, ES-Next (`.js`) atau Typescript (`.ts`) menggunakan import dan export.

    Dari dasar ini, kamu dapat mengimport module pihak ketiga walaupun itu menggunakan CJS. Jika kamu menulis kode module mu dalam CJS, maka kamu tidak dapat menggunakan yang berbentuk ESM.

2. Build 2 kali untuk masing-masing CJS dan ESM
  
     Berikut ini adalah yang perlu ditambahkan pada `package.json` mu
   
     ```json
     {
       "scripts": {
         "fix": "echo { \"type\": \"commonjs\" } > dist/cjs/package.json && echo { \"type\": \"module\" } > dist/mjs/package.json",
         "build": "rm -fr dist/* && tsc -p tsconfig.json && tsc -p tsconfig-cjs.json && npm run fix",
         "prepare": "npm run build"
       },
       "main": "dist/cjs/index.js",
       "module": "dist/mjs/index.js",
       "exports": {
         ".": {
           "import": "./dist/mjs/index.js",
           "require": "./dist/cjs/index.js"
         }
       },
       "devDependencies": {
         "@babel/core": "^7.16.0",
         "@types/node": "^16.11.12",
         "@typescript-eslint/eslint-plugin": "^5.6.0",
         "@typescript-eslint/parser": "^5.6.0",
         "eslint": "^8.4.1",
         "shx": "^0.3.3",
         "typescript": "^4.5.3",
         "vite": "^2.7.1"
       },
       "files": [
         "dist/"
       ],
       "engines": {
         "node": ">=16.0.0",
         "npm": ">=8.0.0"
       }
     }
     ```
   
     `tsconfig.json` adalah pengaturan untuk build ESM.
     
     ```json
     {
       "extends": "./tsconfig-base.json",
       "compilerOptions": {
         "module": "esnext",
         "outDir": "dist/mjs",
         "target": "esnext"
       }
     }
     ```
   
     Dan `tsconfig-cjs.json` untuk CJS.
   
     ```json
     {
       "extends": "./tsconfig-base.json",
       "compilerOptions": {
         "module": "commonjs",
         "outDir": "dist/cjs",
         "target": "es2015"
       }
     }
     ```
   
     Untuk menghidanri duplikasi kode, kita menggunakan satu file yang sama yaitu `tsconfig-base.json` yang digunakan sebagai dasar pengaturan keduanya.
     
     ```json
     {
       "compilerOptions": {
         "allowJs": true,
         "allowSyntheticDefaultImports": true,
         "baseUrl": "src",
         "declaration": true,
         "esModuleInterop": true,
         "inlineSourceMap": false,
         "lib": ["esnext"],
         "listEmittedFiles": false,
         "listFiles": false,
         "moduleResolution": "node",
         "noFallthroughCasesInSwitch": true,
         "noImplicitAny": false,
         "pretty": true,
         "resolveJsonModule": true,
         "rootDir": "src",
         "skipLibCheck": true,
         "strict": false,
         "traceResolution": false,
         "types": ["node"]
       },
       "compileOnSave": false,
       "exclude": ["node_modules", "dist"],
       "include": ["src"]
     }
     ```

Lengkapnya silakan cek plugin buatanku di https://github.com/dansvel/vite-plugin-markdown