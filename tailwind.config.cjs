const daisyui = require('daisyui')
const typography = require('@tailwindcss/typography')
const defaultTheme = require('tailwindcss/defaultTheme')

const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  plugins: [daisyui, typography],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Source Sans 3"', 'Calibri', ...defaultTheme.fontFamily.sans],
        serif: ['"Source Serif 4"', 'Cambria', ...defaultTheme.fontFamily.serif],
        mono: ['"Source Code Pro"', 'Consolas', ...defaultTheme.fontFamily.mono],
      },
    },
  },
}

module.exports = config
