import fs from 'fs';
import path from 'path';
import marked from 'marked';
import frontMatter from 'front-matter';
import markedOptions from '../../components/marked.config';

const posts = fs
    .readdirSync('src/content/post')
    .filter((file) => path.extname(file) === '.md')
    .map((file) => {
      const markdown = fs.readFileSync(path.resolve('src/content/post', file), 'utf-8');
      const {
        body,
        attributes,
      }: {
        body: string;
        attributes: {
          title: string;
          description: string;
          tags: string[];
          category: string;
          image: string;
          date: string;
        };
      } = frontMatter(markdown);
      return {
        ...attributes,
        slug: path.basename(file, '.md'),
        body: marked(body, markedOptions),
      };
    });

export function getPost(slug: string) {
  return posts.find((posts, i) => posts.slug === slug);
}