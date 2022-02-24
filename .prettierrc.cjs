const prettierSvelte = require('prettier-plugin-svelte')

module.exports = {
  arrowParens: 'avoid',
  bracketSpacing: true,
  endOfLine: 'crlf',
  plugins: [prettierSvelte],
  printWidth: 100,
  semi: false,
  singleQuote: true,
  svelteIndentScriptAndStyle: true,
  svelteSortOrder: 'options-scripts-markup-styles',
  svelteStrictMode: false,
  tabWidth: 2,
}
