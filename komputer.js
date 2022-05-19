import fs from 'fs'
import { Command } from 'commander'
import { slugging } from './src/lib/util.js'
import process from 'process'

const contentPath = './src/content'

const program = new Command()

const template = `---
title: {title}
date: 
description: 
category: 
tags: 
---`

program
  .command('buatkan')
  .description('buat konten baru')
  .argument('<apa>', 'halaman atau postingan')
  .argument('<judulnya>', 'judulnya')
  .action((apa, judulnya) => {
    const filename = slugging(judulnya) + '.md'
    if (apa === 'postingan') {
      const files = fs.readdirSync(contentPath + '/posts')
      const exist = files.filter(file => file === filename)

      if (exist.length) program.error('postingan sudah ada, silahkan beri judul yang berbeda')

      const content = template.replace('{title}', judulnya)
      fs.writeFileSync(contentPath + '/posts/' + filename, content)
    }

    console.log(apa, '|', judulnya)
  })

program.parse()
