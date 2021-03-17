const { tailwindExtractor } = require('tailwindcss/lib/lib/purgeUnusedStyles');
const defaultTheme = require('tailwindcss/defaultTheme')
const tailwindCSSTypography = require('@tailwindcss/typography');

module.exports = {
    purge: {
        content: [
            './src/**/*.html',
            './src/**/*.svelte'
        ],
        options: {
            defaultExtractor: (content) => [
                ...tailwindExtractor(content),
                ...[...content.matchAll(/(?:class:)*([\w\d-/:%.]+)/gm)].map(([_match, group, ..._rest]) => group),
            ],
            keyframes: true,
        },
    },
    darkMode: 'class',
    theme: {
        fontFamily: {
            sans: ['"Fira Sans"', ...defaultTheme.fontFamily.sans],
            mono: ['"Fira Code"', ...defaultTheme.fontFamily.mono]
        }
    },
    variants: {
        extend: {},
    },
    plugins: [
        tailwindCSSTypography,
    ],
};
