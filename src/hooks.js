import { arrSortBy, arrUnion, slugFromPath } from '$lib/util';

export const getSession = async () => {
  // let postPromises = []
  // for (let [path, resolver] of Object.entries(import.meta.glob('/src/routes/catatan/*.md'))) {
  //   const slug = slugFromPath(path);
  //   const promise = resolver().then((post) => ({
  //     slug,
  //     ...post.metadata
  //   }));
  //
  //   postPromises.push(promise);
  // }
  const files = await import.meta.glob('/src/routes/catatan/*.md');

  let notes = [];
  for (const path in files) {
    const file = await files[path]();
    const note = {
      slug: slugFromPath(path),
      ...file.metadata
    };
    notes.push(note);
  }
  // const notes = await Promise.all(postPromises);
  // console.log(notes)
  return {
    notes: arrSortBy(notes, 'slug', { asc: false, natural: true }),
    tags: arrUnion(notes.map((note) => [...note.tags])).sort()
  };
};
