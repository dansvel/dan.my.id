import { getContent } from './_page';

export function get(req, res) {
  return {
    status: 200,
    body: getContent('index'),
  };
}
