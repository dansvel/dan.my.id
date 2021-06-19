export const localDate = (date, withHour = false) => {
  let options = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }
  if (withHour) {
    options = {
      ...options,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short'
    }
  }
  return new Date(date).toLocaleDateString('id-ID', options)
}

export const slugger = str => str.toLowerCase().replace(/[^a-z0-9-]/g, '-')

// function bellow i get from https://1loc.dev/
export const arrFlat = arr =>
  [].concat.apply(
    [],
    arr.map(a => (Array.isArray(a) ? arrFlat(a) : a))
  )

export const arrUnion = (...arr) => [...new Set(arrFlat(arr))]

export const arrSortBy = (array, key, asc = true) =>
  array.concat().sort((a, b) => {
    if (asc) return a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0
    return a[key] < b[key] ? 1 : a[key] > b[key] ? -1 : 0
  })

export const randomItems = (arr, count) =>
  arr
    .concat()
    .reduce(
      (p, _, __, arr) =>
        p[0] < count
          ? [p[0] + 1, p[1].concat(arr.splice((Math.random() * arr.length) | 0, 1))]
          : p,
      [0, []]
    )[1]

export const getUrlParams = query =>
  Array.from(new URLSearchParams(query)).reduce(
    (p, [k, v]) =>
      Object.assign({}, p, {
        [k]: p[k] ? (Array.isArray(p[k]) ? p[k] : [p[k]]).concat(v) : v
      }),
    {}
  )

export const urlParamsToQuery = params =>
  Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&')

export const capitalize = str => `${str.charAt(0).toUpperCase()}${str.slice(1)}`
