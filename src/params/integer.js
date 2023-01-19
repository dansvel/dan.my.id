/** @type {import('@sveltejs/kit').ParamMatcher} */
export const match = (param) => /^\d+$/.test(param)
