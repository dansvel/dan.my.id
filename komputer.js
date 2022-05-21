import fs from 'fs'
import { Command } from 'commander'
import { slugging } from './src/lib/util.js'
import process from 'process'

const contentPath = './src/content'

const program = new Command()

const template = `---
title: {title}
date: yyyy-mm-dd
description: string
category: manusia|teknologi
tags: [string]
---

Hai, `

program
  .command('buatkan')
  .description('buat konten baru')
  .argument('<apa>', 'halaman atau postingan')
  .argument('<judulnya>', 'judulnya')
  .action((apa, judulnya) => {
    const filename = slugging(judulnya) + '.md'

    const newContentPath = apa === 'halaman' ? contentPath + '/pages'
      : apa === 'postingan' ? contentPath + '/posts' : ''

    if (newContentPath === '') program.error('tipe salah, postingan / halaman')

      const files = fs.readdirSync(contentPath + '/posts')
      const exist = files.filter(file => file === filename)

      if (exist.length) program.error('postingan sudah ada, silahkan beri judul yang berbeda')

      console.log(newContentPath, filename)
      // const content = template.replace('{title}', judulnya.replace(/ {2,}/g, ' '))
      // fs.writeFileSync(contentPath + '/posts/' + filename, content)

  })

program.parse()
