export const localDate = (date: string, locales: string = 'id-ID') => {
  return new Date(date).toLocaleDateString(locales, {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    // hour: 'numeric',
    // minute: 'numeric',
    // second: 'numeric',
    // timeZoneName: 'short',
  });
};

export const slugger = (str) => str.replace(/[^A-Za-z0-9.-]/g, '').toLowerCase();

// function bellow i get from https://1loc.dev/
export const arrFlat = (arr) =>
  [].concat.apply(
    [],
    arr.map((a) => (Array.isArray(a) ? arrFlat(a) : a))
  );
export const arrUnion = (...arr) => [...new Set(arrFlat(arr))];
export const arrSortBy = (arr: [], k: string, asc = true) =>
  arr.concat().sort((a, b) => {
    if (asc) return a[k] > b[k] ? 1 : a[k] < b[k] ? -1 : 0;
    return a[k] < b[k] ? 1 : a[k] > b[k] ? -1 : 0;
  });

export const getUrlParams = (query) =>
  Array.from(new URLSearchParams(query)).reduce(
    (p, [k, v]) =>
      Object.assign({}, p, {
        [k]: p[k] ? (Array.isArray(p[k]) ? p[k] : [p[k]]).concat(v) : v,
      }),
    {}
  );
