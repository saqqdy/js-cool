import { execSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'

// Subpath entries
const subpathEntries = [
	'ua/index',
	'ua/device',
	'ua/os',
	'ua/browser',
	'ua/env',
	'ua/network',
	'ua/screen',
	'ua/types',
	'patterns/index',
	'date/index',
	'date/types',
	'date/format',
	'date/diff',
	'date/compare',
	'date/manipulate',
	'date/parse',
	'url/index',
	'url/utils',
	'scroll/index',
	'storage/index',
	'storage/types',
	'storage/local',
	'storage/session',
	'storage/cookie',
	'storage/errors',
]

// Step 1: Run tsc to generate declarations for all files
execSync('tsc -p src/tsconfig.json', { stdio: 'inherit' })

// Step 2: Run api-extractor to bundle d.ts for main entry
execSync('api-extractor run --local', { stdio: 'inherit' })

// Step 3: Process main entry types
const mainDts = readFileSync('dist/index.d.ts', 'utf-8')
const cleaned = mainDts.replace(/^export \{ \}$/gm, '').trim()

// CJS version with export =
const cjsTypes = cleaned.replace('export default _default;', 'export = _default;')
// ESM version with export default
const esmTypes = cleaned

writeFileSync('dist/index.d.ts', `${cjsTypes}\n`)
writeFileSync('dist/index.d.mts', `${esmTypes}\n`)

// Step 4: Generate types for subpath entries
// Create simple re-export files for type consistency
for (const entry of subpathEntries) {
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
