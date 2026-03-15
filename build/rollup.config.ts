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
	browser?: boolean
	env: 'development' | 'production'
	file: string
	format: InternalModuleFormat
	input: string
	minify?: boolean
	plugins?: Plugin[]
	transpile?: boolean
}

export interface Output extends OutputOptions {
	plugins: Plugin[]
}

export interface Options extends RollupOptions {
	external: string[]
	output: Output
	plugins: Plugin[]
}

const IS_WATCH = process.env.ROLLUP_WATCH

const configs: Config[] = IS_WATCH
	? [
			{
				env: 'development',
				file: 'dist/index.esm-bundler.js',
				format: 'es',
				input: 'src/index.ts',
			},
			{
				env: 'development',
				file: 'dist/index.cjs.js',
				format: 'cjs',
				input: 'src/index.ts',
			},
		]
	: [
			{
				browser: true,
				env: 'development',
				file: 'dist/index.esm-browser.js',
				format: 'es',
				input: 'src/index.ts',
			},
			{
				browser: true,
				env: 'production',
				file: 'dist/index.esm-browser.prod.js',
				format: 'es',
				input: 'src/index.ts',
				minify: true,
			},
			{
				env: 'development',
				file: 'dist/index.esm-bundler.js',
				format: 'es',
				input: 'src/index.ts',
			},
			{
				env: 'development',
				file: 'dist/index.global.js',
				format: 'iife',
				input: 'src/index.default.ts',
			},
			{
				env: 'production',
				file: 'dist/index.global.prod.js',
				format: 'iife',
				input: 'src/index.default.ts',
				minify: true,
			},
			{
				env: 'development',
				file: 'dist/index.cjs.js',
				format: 'cjs',
				input: 'src/index.default.ts',
			},
		]

function createEntries(): Options[] {
	return configs.map(createEntry)
}

function createEntry(config: Config): Options {
	const isGlobalBuild = config.format === 'iife'
	const isTypeScript = config.input.endsWith('.ts')

	const _config: Options = {
		external: [],
		input: config.input,
		onwarn: (msg: any, warn) => {
			if (!/Circular/.test(msg)) {
				warn(msg)
			}
		},
		output: {
			exports: 'auto',
			file: config.file,
			format: config.format,
			globals: {},
			// extend: true,
			plugins: [],
		},
		plugins: [],
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
			'await-to-done',
			'os-lang'
		)
	}

	_config.plugins.push(
		replace({
			__VERSION__: version,
			preventAssignment: true,
		}),
		nodeResolve(),
		commonjs(),
		json()
	)

	if (config.transpile !== false) {
		_config.plugins.push(
			babel({
				babelHelpers: 'bundled',
				exclude: [/node_modules[\\/]core-js/],
				extensions,
			})
		)
		if (isTypeScript) {
			_config.plugins.push(
				typescript({
					compilerOptions: {
						declaration: false,
					},
				})
			)
		}
	}

	if (config.minify) {
		_config.plugins.push(terser({ module: config.format === 'es' }))
	}

	_config.plugins.push(filesize({ reporter }), visualizer())

	return _config
}

export default createEntries()
