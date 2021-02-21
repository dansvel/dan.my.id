import { getPost } from './_posts';

export function get(req, res) {
  const post = JSON.stringify(getPost(req.params.slug));
  if (typeof post !== 'undefined') {
    return {
      status: 200,
      body: post,
    };
  }
  return {
    status: 404,
  };
}
