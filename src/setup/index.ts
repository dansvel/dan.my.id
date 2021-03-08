import fs from 'fs/promises';
import path from 'path';
// @ts-ignore
import { dev } from '$app/env';
import marked from 'marked';
import frontMatter from 'front-matter';
import markedOptions from "$components/marked.config";

// const getPost = async (slug) => {
//   if (dev) {
//     // @ts-ignore
//     const { body, markdown, ...meta } = await import(`../../_content/post/${slug}.js`).then(module => module.default);
//     return {...meta}
//   } else {
//     // @ts-ignore
//     const { body, markdown, ...meta } = await import(`../../../unoptimized/client/_content/post/${slug}.js`).then(module => module.default);
//     return { ...meta }
//   }
// }

export async function getSession(): Promise<Record<string, any>> {
  const filenames = await fs.readdir('src/content/post');
  const pages = await Promise.all(
    filenames.map(async (filename) => {
      // const slug = await path.basename(filename, '.md');
      // const post = await getPost(slug).then(data => data)
      const post = await fs.readFile(path.resolve('src/content/post', filename), 'utf-8');

      // return {
      //   ...post,
      //   slug
      // };

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
  // console.log(pages, ' => pages')
  return { pages };
}
