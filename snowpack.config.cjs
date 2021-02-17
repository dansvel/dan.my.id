// const markedOptions = require('./marked.config.cjs')
// Consult https://www.snowpack.dev to learn about these options
module.exports = {
	extends: '@sveltejs/snowpack-config',
	plugins: [
        [
            '@snowpack/plugin-build-script',
            {
                cmd: 'postcss',
                input: ['.css', '.pcss'],
                output: ['.css'],
            }
        ],
	    '@snowpack/plugin-typescript',
        // [
        //     'snowpack-plugin-markdown',
        //     markedOptions
        // ]
    ],
	mount: {
		'src/components': '/_components',
	},
	alias: {
		$components: './src/components',
	}
};
