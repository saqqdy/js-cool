import { defineConfig, type Plugin } from 'rolldown'
import pkg from './package.json' with { type: 'json' }

const banner = `/*!\n * ${pkg.name} v${pkg.version}\n * ${pkg.description}\n * (c) 2021-present saqqdy \n * Released under the MIT License.\n */`

const external = [
	'core-js',
	'mount-css',
	'mount-script',
	'mount-image',
	'mount-style',
	'load-source',
	'use-downloads',
	'await-to-done',
	'os-lang',
]

// UA subpath entry for tree-shaking
const uaEntries = ['ua/index']

// 优雅的版本注入插件
const versionPlugin = (): Plugin => ({
	name: 'version-inject',
	resolveId(id) {
		if (id === 'virtual:version') return '\0virtual:version'
	},
	load(id) {
		if (id === '\0virtual:version') {
			return `export const VERSION = ${JSON.stringify(pkg.version)}`
		}
	},
})

export default defineConfig([
	// Main entry - CJS
	{
		input: 'src/index.ts',
		output: {
			file: 'dist/index.js',
			format: 'cjs',
			exports: 'named',
		},
		external,
		plugins: [versionPlugin()],
	},
	// Main entry - ESM
	{
		input: 'src/index.ts',
		output: {
			file: 'dist/index.mjs',
			format: 'esm',
			banner,
		},
		external,
		plugins: [versionPlugin()],
	},
	// IIFE (CDN)
	{
		input: 'src/index.ts',
		output: {
			file: 'dist/index.iife.js',
			format: 'iife',
			name: 'jsCool',
			banner,
			exports: 'named',
			sourcemap: true,
		},
		plugins: [versionPlugin()],
		platform: 'browser',
	},
	// IIFE minified (CDN)
	{
		input: 'src/index.ts',
		output: {
			file: 'dist/index.iife.min.js',
			format: 'iife',
			name: 'jsCool',
			banner,
			minify: true,
			exports: 'named',
		},
		plugins: [versionPlugin()],
		platform: 'browser',
	},
	// UA subpath entries - generate CJS and ESM for each
	...uaEntries.flatMap(entry => [
		{
			input: `src/${entry}.ts`,
			output: {
				file: `dist/${entry}.js`,
				format: 'cjs' as const,
				exports: 'named' as const,
			},
			external,
			plugins: [versionPlugin()],
		},
		{
			input: `src/${entry}.ts`,
			output: {
				file: `dist/${entry}.mjs`,
				format: 'esm' as const,
				banner,
			},
			external,
			plugins: [versionPlugin()],
		},
	]),
])
