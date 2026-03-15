import { spawnSync } from 'node:child_process'
import pkg from '../package.json'

spawnSync('git', ['tag', '-a', `v${pkg.version}`, '-m', pkg.version], {
	shell: process.platform === 'win32',
	stdio: 'inherit',
})
spawnSync('git', ['push', 'origin', `v${pkg.version}`], {
	shell: process.platform === 'win32',
	stdio: 'inherit',
})
spawnSync('git', ['tag', '-d', `v${pkg.version}`], {
	shell: process.platform === 'win32',
	stdio: 'inherit',
})
