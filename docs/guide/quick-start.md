# Quick Start

## Import Methods

### Named Import (Recommended)

Import only what you need for tree-shaking:

```js
import { camel2Dash, unique, clone } from 'js-cool'
```

### Import All

```js
import * as JsCool from 'js-cool'

JsCool.camel2Dash('fontSize')
```

### CommonJS

```js
const { camel2Dash, unique } = require('js-cool')
```

## Usage Examples

### String Utilities

```js
import { camel2Dash, dash2Camel, encodeBase64, decodeBase64 } from 'js-cool'

// camelCase to dash-case
camel2Dash('fontSize') // 'font-size'

// dash-case to camelCase
dash2Camel('font-size') // 'fontSize'

// Base64 encoding
encodeBase64('Hello World') // 'SGVsbG8gV29ybGQ='

// Base64 decoding
decodeBase64('SGVsbG8gV29ybGQ=') // 'Hello World'
```

### Array Utilities

```js
import { unique, shuffle, arrayToCSV } from 'js-cool'

// Remove duplicates
unique([1, 2, 2, 3]) // [1, 2, 3]

// Shuffle array
shuffle([1, 2, 3, 4, 5]) // [3, 1, 5, 2, 4] (random)

// Array to CSV
arrayToCSV([
  ['name', 'age'],
  ['John', 30],
])
// "name,age\n"John",30"
```

### Object Utilities

```js
import { clone, extend, cleanData } from 'js-cool'

// Deep clone
const obj = { a: { b: 1 } }
const cloned = clone(obj)
cloned.a.b = 2
console.log(obj.a.b) // 1 (unchanged)

// Extend object
extend({ a: 1 }, { b: 2 }) // { a: 1, b: 2 }

// Clean data - extract specific keys
cleanData({ name: 'John', password: '123' }, ['name'])
// { name: 'John' }
```

### URL Utilities

```js
import { getUrlParams, parseUrlParam } from 'js-cool'

// Get URL parameters
getUrlParams('https://example.com?name=John&age=30')
// { name: 'John', age: '30' }

// Parse with type conversion
parseUrlParam('?count=100&active=true', true)
// { count: 100, active: true }
```

### DOM Utilities

```js
import { copy, addEvent, removeEvent } from 'js-cool'

// Copy to clipboard
copy('Hello World')

// Add event listener
const handler = e => console.log('clicked')
addEvent(document.getElementById('btn'), 'click', handler)

// Remove event listener
removeEvent(document.getElementById('btn'), 'click', handler)
```

### Storage Utilities

```js
import { setCache, getCache, delCache, setCookie, getCookie } from 'js-cool'

// LocalStorage with expiration
setCache('user', { name: 'John' }, 3600) // expires in 1 hour
getCache('user') // { name: 'John' }
delCache('user')

// Cookie
setCookie('token', 'abc123', 86400)
getCookie('token') // 'abc123'
```

## Next Steps

- [String Utilities](/guide/string) - Learn more about string functions
- [Array Utilities](/guide/array) - Learn more about array functions
- [Object Utilities](/guide/object) - Learn more about object functions
- [API Reference](/api/) - Full API documentation
