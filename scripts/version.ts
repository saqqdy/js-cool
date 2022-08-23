import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { spawnSync } from 'child_process'
import pkg from '../package.json'

const argv: string[] = process.argv.slice(2)
const PACKAGE_JSON_URL = resolve(__dirname, '../package.json')

if (argv.length) {
	if (['small', 'middle', 'large'].includes(argv[0])) {
		const arr: number[] = pkg.version.split('.').map(item => +item)
		switch (argv[0]) {
			case 'small':
				arr[2]++
				break
			case 'middle':
				arr[2] = 0
				arr[1]++
				break
			case 'large':
				arr[2] = 0
				arr[1] = 0
				arr[0]++
				break
			default:
				break
		}
		pkg.version = arr.join('.')

		writeFileSync(PACKAGE_JSON_URL, JSON.stringify(pkg, null, 4))
		spawnSync('npx', ['prettier', '--write', './package.json'], {
			stdio: 'inherit',
			shell: process.platform === 'win32'
		})
	} else {
		console.info('请输入有效的版本类型')
		process.exit(1)
	}
} else {
	console.info('请输入版本类型')
	process.exit(1)
}
