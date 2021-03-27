const postcssNested = require('postcss-nested')

const tailwindcss = require('@tailwindcss/jit')
const autoprefixer = require('autoprefixer')

const mode = process.env.NODE_ENV
const dev = mode === 'development'

module.exports = {
  plugins: [
    postcssNested,
    tailwindcss(),
    autoprefixer,
  ]
}
