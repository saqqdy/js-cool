# getGlobal <Badge type="tip" text="since v6.0.0" />

Safely get a global value by path. A secure, CSP-compliant alternative to dynamic code execution.

## Installation

```bash
pnpm add js-cool
```

## Usage

```js
import { getGlobal } from 'js-cool'

// Get global functions
getGlobal('JSON.parse')  // ƒ parse()
getGlobal('Number')      // ƒ Number()
getGlobal('console.log') // ƒ log()

// Get nested properties
getGlobal('document.body') // <body> element (browser)

// Non-existent path
getGlobal('nonExistent')   // undefined
getGlobal('a.b.c')         // undefined

// With type parameter (TypeScript)
const parse = getGlobal<(str: string) => unknown>('JSON.parse')
```

## API

```typescript
function getGlobal<T = unknown>(path: string): T | undefined
```

### Parameters

| Parameter | Type     | Description                            |
| --------- | -------- | -------------------------------------- |
| `path`    | `string` | Dot-separated path to the global value |

### Returns

- The value at the path, or `undefined` if not found

## Security Benefits

This function is safer than alternatives like `new Function('return ' + path)()`:

| Feature        | `getGlobal` | `new Function()` |
| -------------- | ----------- | ---------------- |
| Code execution | ❌ No       | ⚠️ Yes           |
| CSP compatible | ✅ Yes      | ❌ No            |
| Injection safe | ✅ Yes      | ❌ No            |
| Performance    | ✅ Fast     | ⚠️ Slower        |

## Examples

### Check if Function Exists

```js
import { getGlobal } from 'js-cool'

// Check before calling
const axios = getGlobal('axios')
if (axios) {
  axios.get('/api/data')
}
```

### Get Built-in Constructors

```js
import { getGlobal } from 'js-cool'

const NumberConstructor = getGlobal('Number')
const ArrayConstructor = getGlobal('Array')
const ObjectConstructor = getGlobal('Object')

// Use them
const num = NumberConstructor('123') // 123
const arr = ArrayConstructor(3) // [empty × 3]
```

### Get Nested Properties

```js
import { getGlobal } from 'js-cool'

// Browser environment
const querySelector = getGlobal('document.querySelector')
const localStorage = getGlobal('window.localStorage')

// Node.js environment
const env = getGlobal('process.env')
```
