import fs from 'fs';
import path from 'path';
import marked from 'marked';
import frontMatter from 'front-matter';
import markedOptions from '../../components/marked.config';

export function getPost(slug: string) {
  const markdown = fs.readFileSync(path.resolve('src/content/post', `${slug}.md`), 'utf-8');

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
    slug,
    body: marked(body, markedOptions),
  };
}