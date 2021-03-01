import fs from 'fs/promises';
import path from 'path';
// @ts-ignore
import { dev } from '$app/env';

let piece1 = '.';
let piece2 = '.';
let piece3 = '.';
if (dev) {
  piece1 = '../..';
  piece2 = '_content';
  piece3 = 'post';
}

export async function getSession(): Promise<Record<string, any>> {
  const filenames = await fs.readdir('src/content/post');
  const pages = await Promise.all(
    filenames.map(async (filename) => {
      const slug = await path.basename(filename, '.md');
      // @ts-ignore
      const { default: posts } = await import(`./${piece1}/${piece2}/${piece3}/${slug}.js`);
      const { body, markdown, ...meta } = await posts;

      return {
        ...meta,
        slug,
      };
    })
  );
  return { pages };
}
