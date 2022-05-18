import typography from 'windicss/plugin/typography'

const myColors = {
  // darkgreen: '#006400FF',
  // lightgreen: '#90EE90FF',
  mediumpurple: '#9370DBFF',
  rebeccapurple: '#663399FF',
}

export default {
  darkMode: 'media',
  plugins: [typography({ dark: true })],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Source Sans 3"', 'sans-serif', 'ui-sans-serif', 'system-ui'],
        serif: ['ui-serif', 'Georgia'],
        mono: ['"Source Code Pro"', 'monospace', 'ui-monospace'],
      },
      colors: myColors,
      ringColor: myColors,
      // shadowColors: myColors,
    },
  },
}
