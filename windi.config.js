import typography from 'windicss/plugin/typography'

const myColors = {
  darkgreen: '#006400FF',
  lightgreen: '#90EE90FF',
}

export default {
  darkMode: 'media',
  plugins: [typography({ dark: true })],
  theme: {
    extend: {
      boxShadow: {
        'b-1': '0 1px rgba(0, 0, 0, 0.05)',
        'b-2': '0 2px rgba(0, 0, 0, 0.05)',
        'b-3': '0 3px rgba(0, 0, 0, 0.05)',
        'b-4': '0 4px rgba(0, 0, 0, 0.05)',
        'b-5': '0 5px rgba(0, 0, 0, 0.05)',
      },
      colors: myColors,
      // fontFamily: {
      //   sans: 'Calibri, ui-sans-serif',
      //   mono: 'Consolas, ui-sans',
      //   serif: 'Cambria, ui-monospace',
      // },
      ringColor: myColors,
      shadowColors: myColors,
    },
  },
}
