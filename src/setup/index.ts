import fs from 'fs/promises';
import path from 'path';
// @ts-ignore
import { dev } from '$app/env';

let filePath = '../../../unoptimized/server'
if (dev) {
  filePath = '../..';
}

export async function getSession(): Promise<Record<string, any>> {
  const filenames = await fs.readdir('src/content/post');
  const pages = await Promise.all(
    filenames.map(async (filename) => {
      const slug = await path.basename(filename, '.md');
      // @ts-ignore
      const { default: posts } = await import(`${filePath}/_content/post/${slug}.js`);
      const { body, markdown, ...meta } = await posts;

      return {
        ...meta,
        slug,
      };
    })
  );
  return { pages };
}
