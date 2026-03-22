import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { dirname } from 'node:path'

// UA subpath entries
const uaEntries = [
	'ua/index',
	'ua/device',
	'ua/os',
	'ua/browser',
	'ua/env',
	'ua/network',
	'ua/screen',
	'ua/types',
]

// Step 1: Run tsc to generate declarations for all files
execSync('tsc -p src/tsconfig.json', { stdio: 'inherit' })

// Step 2: Run api-extractor to bundle d.ts for main entry
execSync('api-extractor run', { stdio: 'inherit' })

// Step 3: Process main entry types
const mainDts = readFileSync('dist/index.d.ts', 'utf-8')
const cleaned = mainDts.replace(/^export \{ \}$/gm, '').trim()

// CJS version with export =
const cjsTypes = cleaned.replace('export default _default;', 'export = _default;')
// ESM version with export default
const esmTypes = cleaned

writeFileSync('dist/index.d.ts', `${cjsTypes}\n`)
writeFileSync('dist/index.d.mts', `${esmTypes}\n`)

// Step 4: Generate types for UA subpath entries
// Create simple re-export files for type consistency
for (const entry of uaEntries) {
	// Create directory if needed
	const dir = dirname(`dist/${entry}.d.ts`)
	if (!existsSync(dir)) {
		mkdirSync(dir, { recursive: true })
	}

	// Create content that re-exports relevant types from main bundle
	const content = `// Auto-generated type definitions for ${entry}
export * from '../index'
`

	writeFileSync(`dist/${entry}.d.ts`, content)
	writeFileSync(`dist/${entry}.d.mts`, content)
}

// Clean up temp directory
rmSync('temp', { recursive: true, force: true })

console.log('Generated type declaration files')
