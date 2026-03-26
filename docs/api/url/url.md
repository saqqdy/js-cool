# Url <Badge type="tip" text="since v6.0.0" />

URL utilities with URLSearchParams-like API and a chainable `Url` class.

## Installation

```bash
pnpm add js-cool
```

## Usage

```js
// Import Url class
import { Url } from 'js-cool'

// Or import static functions directly
import {
  parse,
  stringify,
  getOrigin,
  getHost,
  getHostname,
  getPathname,
  getSearch,
  getHash,
} from 'js-cool'

// Or use descriptive aliases
import {
  parse as parseQueryString,
  stringify as stringifyQueryString,
} from 'js-cool'
```

## Two Ways to Use

### 1. Url Class (Chainable Builder)

The `Url` class provides a chainable API for building and manipulating URLs with support for both search and hash parameters.

```js
import { Url } from 'js-cool'

// Create instance
const u = new Url('https://example.com?id=123')

// Get parameter value
u.get('id') // '123'

// Chainable methods
u.set('page', 2).set('size', 10).delete('id').toString()
// 'https://example.com?page=2&size=10'

// URL building
new Url('https://api.example.com')
  .path('users', '123')
  .set('fields', 'name,email')
  .setHashPath('/profile')
  .toString()
// 'https://api.example.com/users/123?fields=name,email#/profile'
```

### 2. Static Functions

Import specific functions for smaller bundle sizes.

```js
import {
  parse,
  stringify,
  getOrigin,
  getHost,
  getHostname,
  getPathname,
  getSearch,
  getHash,
} from 'js-cool'

// Parse query string
parse('?a=1&b=true', { convert: true }) // { a: 1, b: true }

// Build query string
stringify({ a: 1, b: 2 }) // '?a=1&b=2'

// Extract URL parts
getOrigin('https://example.com:8080/path') // 'https://example.com:8080'
getHost('https://example.com:8080/path') // 'example.com:8080'
getHostname('https://example.com:8080/path') // 'example.com'
getPathname('https://example.com/api/users?id=1') // '/api/users'
getSearch('https://example.com?key=value') // '?key=value'
getHash('https://example.com/path#section') // '#section'
```

## Url Class API

### Constructor

```js
const u = new Url() // Use current page URL in browser
const u = new Url('https://example.com?id=123') // With URL string
const u = new Url(urlObject) // With URL object
```

### Parameter Scope

The `Url` class supports both search parameters (before `#`) and hash parameters (after `#`):

| Scope     | Description                                       |
| --------- | ------------------------------------------------- |
| `'search'`| Only handle parameters before `#`                  |
| `'hash'`  | Only handle parameters after `#` (in hash)        |
| `'all'`   | Handle all parameters, hash takes priority (default) |

### URLSearchParams-like Methods

```js
const u = new Url('https://example.com?id=1&id=2&page=1#/path?token=abc')

// Get single value (from all scopes by default)
u.get('id') // '1'
u.get('id', 'search') // '1' (from search only)
u.get('token', 'hash') // 'abc' (from hash only)

// Get all values
u.getAll('id') // ['1', '2']

// Check existence
u.has('id') // true
u.has('token') // true
u.has('missing') // false

// Set (chainable)
u.set('page', 2) // Returns this for chaining
u.set('tab', 'info', 'hash') // Set in hash scope

// Append (chainable)
u.append('id', '3') // Adds id=3

// Delete (chainable)
u.delete('token') // Deletes from all scopes
u.delete('token', 'hash') // Deletes from hash only

// Clear all parameters
u.clear() // Clear all
u.clear('hash') // Clear hash params only

// Iteration
u.keys() // ['id', 'page', 'token']
u.values() // ['1', 'page value', 'abc']
u.entries() // [['id', '1'], ['page', 'value'], ['token', 'abc']]
```

### URL Property Getters

```js
const u = new Url('https://example.com:8080/api/users?id=123#section')

u.origin // 'https://example.com:8080'
u.host // 'example.com:8080' (hostname + port)
u.hostname // 'example.com'
u.pathname // '/api/users'
u.search // '?id=123'
u.hash // '#section'
```

### Path Manipulation

```js
const u = new Url('https://example.com')

// Set path segments (chainable)
u.path('api', 'v1', 'users')
// URL becomes: 'https://example.com/api/v1/users'
```

### Hash Path Operations

```js
const u = new Url('https://example.com#/path/to/page?id=123')

// Get hash path (part between # and ?)
u.getHashPath() // '/path/to/page'

// Set hash path (chainable)
u.setHashPath('/new/path')
// URL becomes: 'https://example.com#/new/path?id=123'
```

### Conversion Methods

```js
const u = new Url('https://example.com?a=1&b=true&page=2#/path?token=abc')

// Get params as object
u.toObject() // { a: '1', b: 'true', page: '2', token: 'abc' }
u.toObject('search') // { a: '1', b: 'true', page: '2' }
u.toObject('hash') // { token: 'abc' }

// Get detailed info with source tracking
u.toDetailObject()
// {
//   search: { a: '1', b: 'true', page: '2' },
//   hash: { token: 'abc' },
//   all: { a: '1', b: 'true', page: '2', token: 'abc' },
//   source: { a: 'search', b: 'search', page: 'search', token: 'hash' }
// }

// Convert to string
u.toString() // Full URL string
u.toURL() // Same as toString()
```

### Iterator Support

```js
const u = new Url('https://example.com?a=1&b=2')

// Use for...of
for (const [key, value] of u) {
  console.log(key, value)
}

// Spread to array
;[...u] // [['a', '1'], ['b', '2']]
```

## Static Methods

### parse(str, options?)

Parse query string to object.

```js
import { parse } from 'js-cool'

parse('?a=1&b=true')
// { a: '1', b: 'true' }

parse('?a=1&b=true', { convert: true })
// { a: 1, b: true }
```

### stringify(params, options?)

Build query string from object.

```js
import { stringify } from 'js-cool'

stringify({ a: 1, b: 2 }) // '?a=1&b=2'

stringify({ a: 1 }, { withQuestionMark: false }) // 'a=1'

stringify({ name: 'hello world' }, { encode: true }) // '?name=hello%20world'
```

### URL Property Extraction

```js
import { getOrigin, getHost, getHostname, getPathname, getSearch, getHash } from 'js-cool'

getOrigin('https://example.com:8080/path') // 'https://example.com:8080'
getHost('https://example.com:8080/path') // 'example.com:8080'
getHostname('https://example.com:8080/path') // 'example.com'
getPathname('https://example.com/api/users?id=1') // '/api/users'
getSearch('https://example.com?key=value') // '?key=value'
getHash('https://example.com/path#section') // '#section'
```

### Url.current()

Create instance from current page URL (browser only).

```js
const u = Url.current()
```

### Url.fromQueryString(queryString)

Create instance from query string.

```js
const u = Url.fromQueryString('a=1&b=2')
u.toObject() // { a: '1', b: '2' }
```

## Types

```ts
import type { ParamScope, ParseOptions, StringifyOptions } from 'js-cool'

type ParamScope = 'search' | 'hash' | 'all'

interface ParseOptions {
  /** Convert special values (true/false/null/undefined/number) */
  convert?: boolean
}

interface StringifyOptions {
  /** Convert null/undefined to empty string */
  convert?: boolean
  /** URI encode values */
  encode?: boolean
  /** Include ? prefix */
  withQuestionMark?: boolean
}
```

## Examples

### Building API URLs

```js
import { Url } from 'js-cool'

const apiUrl = new Url('https://api.example.com')
  .path('v2', 'users', '123')
  .set('fields', 'name,email,avatar')
  .set('include', 'posts,comments')
  .toString()
// 'https://api.example.com/v2/users/123?fields=name,email,avatar&include=posts,comments'
```

### Working with Hash Parameters

```js
import { Url } from 'js-cool'

const u = new Url('https://example.com?token=old#/page?token=new')

// Distinguish parameter sources
u.get('token', 'search') // 'old' - search param
u.get('token', 'hash') // 'new' - hash param
u.get('token') // 'new' - hash priority by default

// Get detailed source info
u.toDetailObject()
// { search: { token: 'old' }, hash: { token: 'new' }, all: { token: 'new' }, source: { token: 'both' } }
```

### SPA Hash Routing

```js
import { Url } from 'js-cool'

// Parse hash route with parameters
const u = new Url(window.location.href)
const route = u.getHashPath() // '/user/profile'
const params = u.toObject('hash') // { tab: 'settings', id: '123' }
```

## Migration from v5.x

The URL utilities are new in v6.0.0. The following deprecated functions have been removed:

| Removed             | Replacement                                  |
| ------------------- | -------------------------------------------- |
| `getUrlParam()`     | `Url.get()` or `new Url(url).get()`          |
| `getUrlParams()`    | `parse()` or `new Url(url).toObject()`       |
| `parseUrlParam()`   | `parse()` with `{ convert: true }`           |
| `spliceUrlParam()`  | `stringify()`                                |
| `getQueryParam()`   | `new Url(url).get(name, 'hash')`             |
| `getQueryParams()`  | `new Url(url).toObject('hash')`              |

See the [Migration Guide](../../guide/migration.md#url-utilities) for details.

## Related

- [Url Class](/api/url/Url-class) - Detailed Url class documentation
- [getDirParams](/api/url/get-dir-params) - Get URL path segments
