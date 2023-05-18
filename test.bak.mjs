import { dirname, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import glob from 'fast-glob'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const moduleList = glob
	.sync('*', {
		cwd: resolve(__dirname, 'src'),
		ignore: ['__tests__', '*_bak', 'tsconfig.*', '*.bak', '*.mjs', '*.default.ts', 'index.ts'],
		deep: 1,
		onlyFiles: true
	})
	.map(name => name.replace(/\.ts$/, ''))
// .map(name => resolve('src', name))

console.log(moduleList)
