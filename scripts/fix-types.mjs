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
execSync('npx tsc -p src/tsconfig.json', { stdio: 'inherit' })

// Step 2: Run api-extractor to bundle d.ts for main entry
execSync('npx api-extractor run --local', { stdio: 'inherit' })

// Step 3: Process main entry types
const mainDts = readFileSync('dist/index.d.ts', 'utf-8')
const cleaned = mainDts.replace(/^export \{ \}$/gm, '').trim()

// CJS version (.d.cts) with export = pattern
const cjsTypes = cleaned.replace('export default _default;', 'export = _default;')

// ESM version (.d.mts) - convert CJS-style imports to ESM-style
// Change `import { default as X }` to `import X` for ESM
const esmTypes = cleaned.replace(/import \{ default as (\w+) \} from/g, 'import $1 from')

// Write CJS types as .d.cts and keep .d.ts as a fallback
writeFileSync('dist/index.d.cts', `${cjsTypes}\n`)
writeFileSync('dist/index.d.mts', `${esmTypes}\n`)
// Keep a .d.ts for backward compatibility (CJS-style)
writeFileSync('dist/index.d.ts', `${cjsTypes}\n`)

// Step 4: Generate types for subpath entries
// Create simple re-export files for type consistency
for (const entry of subpathEntries) {
	// Create directory if needed
	const dir = dirname(`dist/${entry}.d.ts`)
	if (!existsSync(dir)) {
		mkdirSync(dir, { recursive: true })
	}

	// For CJS (.d.cts and .d.ts) - use relative import without extension
	const cjsContent = `// Auto-generated type definitions for ${entry}
export * from '../index'
`
	// For ESM (.d.mts) - reference the main ESM types with explicit extension
	const esmContent = `// Auto-generated type definitions for ${entry}
export * from '../index.mjs'
`

	writeFileSync(`dist/${entry}.d.cts`, cjsContent)
	writeFileSync(`dist/${entry}.d.mts`, esmContent)
	// Keep .d.ts for backward compatibility
	writeFileSync(`dist/${entry}.d.ts`, cjsContent)
}

// Clean up temp directory
rmSync('temp', { recursive: true, force: true })

console.log('Generated type declaration files')
