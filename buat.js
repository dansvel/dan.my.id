import fs from 'fs'
import { Command } from 'commander'
import { slugging } from './src/lib/util.js'

const postsPath = './src/content/posts'

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
