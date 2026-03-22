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
| Node.js | ✅ >= 18 |

## License

[MIT License](https://github.com/saqqdy/js-cool/blob/master/LICENSE)
