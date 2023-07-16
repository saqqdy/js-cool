import type { InternalModuleFormat, OutputOptions, Plugin, RollupOptions } from 'rollup'
import nodeResolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import filesize from 'rollup-plugin-filesize'
import json from '@rollup/plugin-json'
// import polyfill from 'rollup-plugin-polyfill-node'
import { visualizer } from 'rollup-plugin-visualizer'
import replace from '@rollup/plugin-replace'
import { banner, extensions, reporter, version } from './config'

export interface Config {
	input: string
	file: string
	format: InternalModuleFormat
	browser?: boolean
	minify?: boolean
	transpile?: boolean
	env: 'development' | 'production'
	plugins?: Plugin[]
}

export interface Output extends OutputOptions {
	plugins: Plugin[]
}

export interface Options extends RollupOptions {
	external: string[]
	plugins: Plugin[]
	output: Output
}

const IS_WATCH = process.env.ROLLUP_WATCH

const configs: Config[] = IS_WATCH
	? [
			{
				input: 'src/index.ts',
				file: 'dist/index.esm-bundler.js',
				format: 'es',
				env: 'development'
			},
			{
				input: 'src/index.ts',
				file: 'dist/index.cjs.js',
				format: 'cjs',
				env: 'development'
			}
	  ]
	: [
			{
				input: 'src/index.ts',
				file: 'dist/index.esm-browser.js',
				format: 'es',
				browser: true,
				env: 'development'
			},
			{
				input: 'src/index.ts',
				file: 'dist/index.esm-browser.prod.js',
				format: 'es',
				browser: true,
				minify: true,
				env: 'production'
			},
			{
				input: 'src/index.ts',
				file: 'dist/index.esm-bundler.js',
				format: 'es',
				env: 'development'
			},
			{
				input: 'src/index.default.ts',
				file: 'dist/index.global.js',
				format: 'iife',
				env: 'development'
			},
			{
				input: 'src/index.default.ts',
				file: 'dist/index.global.prod.js',
				format: 'iife',
				minify: true,
				env: 'production'
			},
			{
				input: 'src/index.default.ts',
				file: 'dist/index.cjs.js',
				format: 'cjs',
				env: 'development'
			}
	  ]

function createEntries() {
	return configs.map(createEntry)
}

function createEntry(config: Config) {
	const isGlobalBuild = config.format === 'iife'
	const isTypeScript = config.input.endsWith('.ts')

	const _config: Options = {
		external: [],
		input: config.input,
		plugins: [],
		output: {
			file: config.file,
			format: config.format,
			exports: 'auto',
			extend: true,
			plugins: [],
			globals: {}
		},
		onwarn: (msg: any, warn) => {
			if (!/Circular/.test(msg)) {
				warn(msg)
			}
		}
	}

	if (isGlobalBuild || config.browser) _config.output.banner = banner

	if (isGlobalBuild) {
		_config.output.name = _config.output.name || 'jsCool'
	}

	if (!isGlobalBuild) {
		_config.external.push(
			'core-js',
			'tslib',
			'mount-css',
			'mount-script',
			'mount-image',
			'mount-style',
			'load-source',
			'use-downloads',
			'os-lang'
		)
	}

	_config.plugins.push(
		replace({
			preventAssignment: true,
			__VERSION__: version
		}),
		nodeResolve(),
		commonjs(),
		json()
	)

	if (config.transpile !== false) {
		_config.plugins.push(
			babel({
				babelHelpers: 'bundled',
				extensions,
				exclude: [/node_modules[\\/]core-js/]
			})
		)
		isTypeScript &&
			_config.plugins.push(
				typescript({
					compilerOptions: {
						declaration: false
					}
				})
			)
	}

	if (config.minify) {
		_config.plugins.push(terser({ module: config.format === 'es' }))
	}

	_config.plugins.push(filesize({ reporter }), visualizer())

	return _config
}

export default createEntries()
