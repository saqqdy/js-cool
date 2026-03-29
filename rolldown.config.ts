import { transformSync } from '@swc/core'
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
	'await-to-done',
]

// Subpath entries for tree-shaking
const subpathEntries = [
	'ua/index',
	'patterns/index',
	'date/index',
	'url/index',
	'scroll/index',
	'storage/index',
]

// Version injection plugin
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

// ES5 transpilation plugin for IE11 support
// Uses SWC to transpile IIFE output to ES5
const es5Plugin = (): Plugin => ({
	name: 'es5-transpile',
	renderChunk(code, chunk) {
		// Only transpile IIFE chunks
		if (chunk.fileName.includes('.iife.')) {
			const result = transformSync(code, {
				jsc: {
					target: 'es5',
					parser: {
						syntax: 'ecmascript',
					},
					minify: {
						compress: false,
						mangle: false,
					},
				},
				sourceMaps: true,
			})
			return {
				code: result.code,
				map: result.map,
			}
		}
		return null
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
	// IIFE (CDN) - ES5 for IE11 compatibility
	{
		input: 'src/index.ts',
		output: {
			name: 'jsCool',
			file: 'dist/index.iife.js',
			format: 'iife',
			banner,
			exports: 'named',
			sourcemap: true,
		},
		plugins: [versionPlugin(), es5Plugin()],
		platform: 'browser',
	},
	// IIFE minified (CDN) - ES5 for IE11 compatibility
	{
		input: 'src/index.ts',
		output: {
			name: 'jsCool',
			file: 'dist/index.iife.min.js',
			format: 'iife',
			banner,
			minify: true,
			exports: 'named',
		},
		plugins: [versionPlugin(), es5Plugin()],
		platform: 'browser',
	},
	// Subpath entries - generate CJS and ESM for each
	...subpathEntries.flatMap(entry => [
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
