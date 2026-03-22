# Migration Guide

## From v5.x to v6.x

### Build System Migration

v6.0 migrates from Rollup to Rolldown, resulting in simplified build outputs and faster build times.

### Output Files Mapping

| v5.x | v6.x | Format |
|------|------|--------|
| `dist/index.cjs.js` | `dist/index.js` | CJS |
| `dist/index.mjs` | `dist/index.mjs` | ESM |
| `dist/index.esm-browser.js` | `dist/index.mjs` | ESM (use directly) |
| `dist/index.esm-browser.prod.js` | `dist/index.mjs` | ESM (let bundler minify) |
| `dist/index.global.js` | `dist/index.iife.js` | IIFE |
| `dist/index.global.prod.js` | `dist/index.iife.min.js` | IIFE (minified) |

### CDN Migration

```html
<!-- v5.x -->
<script src="https://unpkg.com/js-cool/dist/index.global.prod.js"></script>
<script>
  const { copy, randomString } = window.JsCool
</script>

<!-- v6.x -->
<script src="https://unpkg.com/js-cool/dist/index.iife.min.js"></script>
<script>
  const { copy, randomString } = window.jsCool
</script>
```

::: warning
The global variable name changed from `JsCool` (PascalCase) to `jsCool` (camelCase).
:::

### Import Path Migration

```js
// v5.x - Direct file import
import jsCool from 'js-cool/dist/index.esm-browser.js'

// v6.x - Use package export
import jsCool from 'js-cool'
```

### Deprecated Functions

| v5.x (Deprecated) | v6.x (Replacement) |
|-------------------|-------------------|
| `getAppVersion()` | `appVersion()` |
| `getOsVersion()` | `osVersion()` |

```js
// v5.x
const version = getAppVersion('Chrome')
const os = getOsVersion()

// v6.x
const version = appVersion('Chrome')
const os = osVersion()
```

### Package Exports

v6.x uses conditional exports for better module resolution:

```json
{
  "exports": {
    ".": {
      "require": {
        "types": "./dist/index.d.ts",
        "default": "./dist/index.js"
      },
      "import": {
        "types": "./dist/index.d.mts",
        "default": "./dist/index.mjs"
      }
    }
  }
}
```

This ensures:
- Correct type declarations for CJS and ESM
- Proper module resolution in different environments
- Better tree-shaking support

### Build Performance

| Metric | v5.x (Rollup) | v6.x (Rolldown) |
|--------|---------------|-----------------|
| Build time | ~6-8s | ~110ms |
| Config file | ~190 lines | ~65 lines |
| Dependencies | 10+ plugins | Built-in |
