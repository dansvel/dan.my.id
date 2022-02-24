export const localDate = new Intl.DateTimeFormat('id-ID', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
})
export const localDateTime = new Intl.DateTimeFormat('id-ID', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
})

export const slugger = str => str.toLowerCase().replace(/[^a-z0-9-]/g, '-')
// export const slugger = str => str.match(/([\w-]+)/i)?.[1] ?? null

// function bellow i get from https://1loc.dev/
export const arrFlat = arr =>
  [].concat.apply(
    [],
    arr.map(a => (Array.isArray(a) ? arrFlat(a) : a))
  )

// export const arrUnion = (...arr) => [...new Set(arrFlat(arr))]

export const arrSortBy = (array, key, sort = 'asc') => {
  if (sort !== 'desc') {
    return array.concat().sort((a, b) =>
      a[key].localeCompare(b[key], undefined, {
        numeric: true,
        sensitivity: 'base',
      })
    )
  }
  return array.concat().sort((a, b) =>
    b[key].localeCompare(a[key], undefined, {
      numeric: true,
      sensitivity: 'base',
    })
  )
}

// export const randomItems = (arr, count) =>
//   arr
//     .concat()
//     .reduce(
//       (p, _, __, arr) =>
//         p[0] < count
//           ? [p[0] + 1, p[1].concat(arr.splice((Math.random() * arr.length) | 0, 1))]
//           : p,
//       [0, []]
//     )[1]
//
// export const getUrlParams = query =>
//   Array.from(new URLSearchParams(query)).reduce(
//     (p, [k, v]) =>
//       Object.assign({}, p, {
//         [k]: p[k] ? (Array.isArray(p[k]) ? p[k] : [p[k]]).concat(v) : v
//       }),
//     {}
//   )
//
// export const urlParamsToQuery = params =>
//   Object.keys(params)
//     .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
//     .join('&')

// export const capitalize = str => `${str.charAt(0).toUpperCase()}${str.slice(1)}`
