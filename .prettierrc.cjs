const prettierSvelte = require('prettier-plugin-svelte')

module.exports = {
  tabWidth: 2,
  arrowParens: 'avoid',
  singleQuote: true,
  printWidth: 90,
  plugins: [prettierSvelte],
  semi: false,
  svelteSortOrder: 'options-scripts-markup-styles',
  svelteStrictMode: false,
  svelteBracketNewLine: true,
  svelteIndentScriptAndStyle: true,
  trailingComma: 'none'
}
