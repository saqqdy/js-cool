# Introduction

**js-cool** is a modern JavaScript utility library that provides a collection of useful functions for everyday development.

## Why js-cool?

- **🌱 Lightweight** - Zero dependencies, tree-shakable, and small bundle size
- **💎 TypeScript** - Written in TypeScript with full type definitions
- **🌐 Universal** - Works in browser, Node.js, and any JavaScript environment
- **📦 Rich** - 100+ utility functions for various use cases
- **🧪 Reliable** - Well tested with high coverage

## Quick Example

```js
import { camel2Dash, unique, clone, getUrlParams } from 'js-cool'

// Convert camelCase to dash-case
camel2Dash('fontSize') // 'font-size'

// Remove duplicates from array
unique([1, 2, 2, 3, 3, 4]) // [1, 2, 3, 4]

// Deep clone object
const obj = { a: { b: 1 } }
const cloned = clone(obj)

// Parse URL parameters
getUrlParams('https://example.com?name=John&age=30')
// { name: 'John', age: '30' }
```

## Browser Support

js-cool supports all modern browsers and Node.js >= 18.

| Browser | Support  |
| ------- | -------- |
| Chrome  | ✅       |
| Firefox | ✅       |
| Safari  | ✅       |
| Edge    | ✅       |
| IE11    | ✅       |
| Node.js | ✅ >= 18 |

### IE11 Compatibility

js-cool v6.x includes built-in IE11 compatibility without requiring external polyfills. All methods work seamlessly in IE11 through an internal compatibility layer.

The library includes an internal `_compat.ts` module that provides IE11-compatible alternatives to ES6+ features:

| ES6+ Feature           | IE11 Compatible Alternative         |
| ---------------------- | ----------------------------------- |
| `Array.includes()`     | `arrayIncludes()`                   |
| `String.includes()`    | `strIncludes()`                     |
| `String.startsWith()`  | `strStartsWith()`                   |
| `String.endsWith()`    | `strEndsWith()`                     |
| `String.padStart()`    | `padStart()`                        |
| `String.padEnd()`      | `padEnd()`                          |
| `Number.isNaN()`       | `isNumberNaN()`                     |
| `Number.isFinite()`    | `isNumberFinite()`                  |
| `Number.isInteger()`   | `isNumberInteger()`                 |
| `Object.assign()`      | `objectAssign()`                    |
| `Object.values()`      | `objectValues()`                    |
| `Object.entries()`     | `objectEntries()`                   |
| `Object.fromEntries()` | `objectFromEntries()`               |
| `globalThis`           | `getGlobalObject()`                 |
| `new File()`           | `createFile()` (falls back to Blob) |
| `Symbol.iterator`      | `isIterableCompat()`                |

Some functions have built-in graceful degradation:

| Function         | IE11 Behavior                                             |
| ---------------- | --------------------------------------------------------- |
| `isURL()`        | Falls back to regex validation when `URL` API unavailable |
| `getDirParams()` | Uses regex parsing when `URL` API unavailable             |
| `urlToBlob()`    | Uses XHR when `fetch` unavailable                         |
| `isDarkMode()`   | Returns `false` (media query not supported)               |
| `base64ToFile()` | Returns `Blob` with `name` property instead of `File`     |

## License

[MIT License](https://github.com/saqqdy/js-cool/blob/master/LICENSE)
