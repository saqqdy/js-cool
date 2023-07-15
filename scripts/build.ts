import { spawn } from 'child_process'
import { cp } from '@node-kit/extra.fs'

const [, , ...args] = process.argv

async function run() {
	await Promise.all([build(), copy()])
}

async function build() {
	await spawn(
		'rollup',
		['-c', 'build/rollup.config.ts', '--configPlugin', '@rollup/plugin-typescript'].concat(
			args.includes('-w') ? ['-w'] : []
		),
		{ stdio: 'inherit' }
	)
}

async function copy() {
	await cp('src/index.mjs', 'dist')
}

run()
