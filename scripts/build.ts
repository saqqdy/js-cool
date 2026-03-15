import { spawn } from 'node:child_process'
import { cp } from '@node-kit/extra.fs'

const [, , ...args] = process.argv

async function run(): Promise<void> {
	await Promise.all([build(), copy()])
}

async function build(): Promise<void> {
	await spawn(
		'rollup',
		['-c', 'build/rollup.config.ts', '--configPlugin', '@rollup/plugin-typescript'].concat(
			args.includes('-w') ? ['-w'] : []
		),
		{ stdio: 'inherit' }
	)
}

async function copy(): Promise<void> {
	await cp('src/index.mjs', 'dist')
}

run()
