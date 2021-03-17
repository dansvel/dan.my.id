import fs from 'fs';
import path from 'path';
// @ts-ignore
import { dev } from '$app/env';
import frontMatter from 'front-matter';

export async function getSession(): Promise<Record<string, any>> {
  const filenames = await fs.readdirSync('contents/post');
  const pages = await Promise.all(
      filenames.map(async (filename) => {
        const post = await fs.readFileSync(path.resolve('contents/post', filename), 'utf-8');

        const {
          attributes,
        }: {
          attributes: {
            title: string;
            description: string;
            tags: string[];
            category: string;
            image: string;
            date: string;
          };
        } = frontMatter(post);
        return {
          slug: await path.basename(filename, '.md'),
          ...attributes,
        };
      })
  );

  return { pages };
}