import { arrSortBy, arrUnion, slugFromPath } from '$lib/util'

export const getSession = async () => {
  const noteFiles = await import.meta.glob('/src/routes/catatan/*.md')
  let notes = []
  for (const path in noteFiles) {
    const file = await noteFiles[path]()
    const note = {
      slug: slugFromPath(path),
      ...file.metadata
    }
    notes.push(note)
  }

  const pageFiles = await import.meta.glob('/src/routes/*.md')
  let pages = []
  for (const path in pageFiles) {
    const file = await pageFiles[path]()
    const page = {
      slug: slugFromPath(path),
      ...file.metadata
    }
    pages.push(page)
  }
  return {
    notes: arrSortBy(notes, 'slug', { asc: false, natural: true }),
    pages,
    tags: arrUnion(notes.map(note => [...note.tags])).sort()
  }
}
