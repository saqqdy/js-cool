import { spawnSync } from 'child_process'
import pkg from '../package.json'

spawnSync('git', ['tag', '-a', `v${pkg.version}`, '-m', pkg.version], {
	stdio: 'inherit',
	shell: process.platform === 'win32'
})
spawnSync('git', ['push', 'origin', `v${pkg.version}`], {
	stdio: 'inherit',
	shell: process.platform === 'win32'
})
spawnSync('git', ['tag', '-d', `v${pkg.version}`], {
	stdio: 'inherit',
	shell: process.platform === 'win32'
})
