import fs from 'fs';
import path from 'path';
import marked from 'marked';
import frontMatter from 'front-matter';
import markedOptions from '../components/markedOptions';

export function getContent(slug: string) {
  const markdown = fs.readFileSync(path.resolve(`content/page/${slug}.md`), 'utf-8');
  const { body, attributes }: { body: string; attributes: {} } = frontMatter(markdown);
  return {
    ...attributes,
    body: marked(body, markedOptions),
  };
}
