import { getPosts } from './_posts.js';

export function get(req, res) {
  let posts = getPosts();
  return {
    status: 200,
    body: posts,
  };
}
