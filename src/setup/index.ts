import fs from 'fs/promises';
import path from 'path';
// @ts-ignore
import { dev } from '$app/env';

let filepath = '.';
if (dev) {
  filepath = '../../_content/post';
}

export async function getSession(): Promise<Record<string, any>> {
  const filenames = await fs.readdir('src/content/post');
  const pages = await Promise.all(
    filenames.map(async (filename) => {
      const slug = path.basename(filename, '.md');
      // @ts-ignore
      const { default: posts } = await import(`${filepath}/${slug}.js`);
      const { body, markdown, ...meta } = posts;

      return {
        ...meta,
        slug,
      };
    })
  );
  return { pages };
}
