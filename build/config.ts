import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import chalk from 'chalk'
import pkg from '../package.json' assert { type: 'json' }

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const banner =
	'/*!\n' +
	' * ' +
	pkg.name +
	' v' +
	pkg.version +
	'\n' +
	' * ' +
	pkg.description +
	'\n' +
	' * (c) 2021-' +
	new Date().getFullYear() +
	' saqqdy \n' +
	' * Released under the MIT License.\n' +
	' */'

export const bannerText =
	pkg.name +
	' v' +
	pkg.version +
	'\n' +
	pkg.description +
	'\n' +
	'(c) 2021-' +
	new Date().getFullYear() +
	' saqqdy \n' +
	'Released under the MIT License.'

export const externals = {}

export const version = pkg.version

export const extensions = [
	'.js',
	'.mjs',
	'.cjs',
	'.jsx',
	'.ts',
	'.mts',
	'.cts',
	'.tsx',
	'.es6',
	'.es',
	'.json',
	'.less',
	'.css'
]

export const alias = {
	'@': resolve(__dirname, '..', 'src'),
	'load-yml': resolve(__dirname, '..')
}

export const jsexclude = /node_modules/

export function generateExternal(
	{ name, input, isFull = false }: { name: string; input: string; isFull?: boolean },
	externals: string[] = []
) {
	const { dependencies = {}, devDependencies = {}, peerDependencies = {} } = pkg
	return (id: string) => {
		const pkgs: string[] = Object.keys(peerDependencies)
		if (!isFull) {
			pkgs.push(...Object.keys(dependencies), ...Object.keys(devDependencies))
		}
		return [...new Set(pkgs)].some(
			pkg =>
				id === pkg ||
				id.startsWith(`${pkg}/`) ||
				(id !== input && id.includes(`packages/${name}`)) ||
				externals.includes(id)
		)
	}
}

export const reporter = (opt: any, outputOptions: any, info: any) =>
	`${chalk.cyan(
		chalk.bold(
			outputOptions.file ? `${outputOptions.file.split('src/').pop()}` : info.fileName || ''
		)
	)}: bundle size ${chalk.yellow(info.bundleSize)} -> minified ${chalk.green(
		(info.minSize && `${info.minSize}`) || ''
	)}`

export const excludeFiles = (files: string[]) => {
	const excludes = ['node_modules', 'test', 'mock', 'gulpfile', 'dist']
	return files.filter(path => !excludes.some(exclude => path.includes(exclude)))
}
