import { readFileSync, rmSync, writeFileSync } from 'node:fs'
import { execSync } from 'node:child_process'

// Run tsc to generate declarations
execSync('tsc -p src/tsconfig.json', { stdio: 'inherit' })

// Run api-extractor to bundle d.ts
execSync('api-extractor run', { stdio: 'inherit' })

// Clean up temp directory
rmSync('temp', { recursive: true })

// Read the bundled index.d.ts
const dts = readFileSync('dist/index.d.ts', 'utf-8')

// Remove empty export
const cleaned = dts.replace(/^export \{ \}$/gm, '').trim()

// CJS version with export =
const cjsTypes = cleaned.replace('export default _default;', 'export = _default;')

// ESM version with export default
const esmTypes = cleaned

// Write files
writeFileSync('dist/index.d.ts', `${cjsTypes}\n`)
writeFileSync('dist/index.d.mts', `${esmTypes}\n`)

console.log('Generated type declaration files')
