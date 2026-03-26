# Url <Badge type="tip" text="since v6.0.0" />

Enhanced URL builder and parameter manager with support for both search and hash parameters.

## Usage

```js
import { Url } from 'js-cool'
```

## Overview

`Url` is a comprehensive URL handler that solves the problem where the native `URL` class cannot correctly parse parameters inside the hash fragment.

When a URL contains both search parameters (before `#`) and hash parameters (after `#`), such as `https://a.cn/?ss=1#/path?bb=343`, `Url` can handle both types of parameters separately.

**Key Features:**

- URL parsing and building
- Dual parameter support (search + hash)
- Chainable API for modifications
- URL property access (origin, host, pathname, etc.)
- Hash path operations

## Signature

```typescript
type ParamScope = 'search' | 'hash' | 'all'

class Url {
  constructor(url?: string | URL)

  // URL Properties
  readonly origin: string
  readonly host: string
  readonly hostname: string
  readonly pathname: string
  readonly search: string
  readonly hash: string

  // Read operations
  get(name: string, scope?: ParamScope): string | null
  getAll(name: string, scope?: ParamScope): string[]
  has(name: string, scope?: ParamScope): boolean
  keys(scope?: ParamScope): string[]
  values(scope?: ParamScope): string[]
  entries(scope?: ParamScope): [string, string][]

  // Write operations
  set(name: string, value: string | number | boolean, scope?: 'search' | 'hash'): this
  append(name: string, value: string | number | boolean, scope?: 'search' | 'hash'): this
  delete(name: string, scope?: ParamScope): this
  clear(scope?: ParamScope): this

  // Path operations
  path(...segments: string[]): this

  // Hash path operations
  getHashPath(): string
  setHashPath(path: string): this

  // Conversion operations
  toObject(scope?: ParamScope): Record<string, string>
  toDetailObject(): {
    search: Record<string, string>
    hash: Record<string, string>
    all: Record<string, string>
    source: Record<string, 'search' | 'hash' | 'both'>
  }
  toString(): string
  toURL(): string

  // Iterator
  [Symbol.iterator](): Iterator<[string, string]>

  // Static methods
  static parse(str: string, options?: { convert?: boolean }): Record<string, unknown>
  static stringify(
    params: Record<string, unknown>,
    options?: { encode?: boolean; withQuestionMark?: boolean }
  ): string
  static getOrigin(url: string): string
  static getHost(url: string): string
  static getHostname(url: string): string
  static getPathname(url: string): string
  static getSearch(url: string): string
  static getHash(url: string): string
  static current(): Url | null
  static fromQueryString(queryString: string): Url
}
```

## Parameter Scope

| Value      | Description                                                       |
| ---------- | ----------------------------------------------------------------- |
| `'search'` | Only handle parameters before `#` (location.search)               |
| `'hash'`   | Only handle parameters after `#` (query params inside hash)       |
| `'all'`    | Handle all parameters, hash takes priority when reading (default) |

## Examples

### Basic Usage

```js
// Parse URL with both search and hash parameters
const u = new Url('https://a.cn/?ss=1#/path?bb=343')

// Auto-find from search + hash (hash priority)
u.get('ss') // '1' (from search)
u.get('bb') // '343' (from hash)
u.has('ss') // true
u.keys() // ['ss', 'bb']
```

### URL Properties

```js
const u = new Url('https://example.com:8080/api/users?id=1#section')

u.origin // 'https://example.com:8080'
u.host // 'example.com:8080'
u.hostname // 'example.com'
u.pathname // '/api/users'
u.search // '?id=1'
u.hash // '#section'
```

### Specify Parameter Scope

```js
const u = new Url('https://example.com?token=old#/page?token=new')

// Get from search only
u.get('token', 'search') // 'old'

// Get from hash only
u.get('token', 'hash') // 'new'

// Default (all), hash priority
u.get('token') // 'new'
```

### Chainable URL Building

```js
const apiUrl = new Url('https://api.example.com')
  .path('users', '123')
  .set('fields', 'name,email')
  .setHash('profile')
  .toURL()
// 'https://api.example.com/users/123?fields=name%2Cemail#profile'
```

### Get All Parameters

```js
const u = new Url('https://a.cn/?ss=1#/path?bb=343')

// Get all parameters object
u.toObject() // { ss: '1', bb: '343' }

// Get search parameters only
u.toObject('search') // { ss: '1' }

// Get hash parameters only
u.toObject('hash') // { bb: '343' }
```

### Detailed Information (Track Source)

```js
const u = new Url('https://example.com?token=old#/page?token=new')
u.toDetailObject()
// {
//   search: { token: 'old' },
//   hash: { token: 'new' },
//   all: { token: 'new' },
//   source: { token: 'both' }
// }
```

### Chaining Modifications

```js
const u = new Url('https://example.com')
u.set('token', 'abc').set('page', 1).set('id', 123, 'hash')

u.toURL() // 'https://example.com/?token=abc&page=1#?id=123'
```

### Delete Parameters

```js
const u = new Url('https://example.com?a=1#/path?a=2')

// Delete from all scopes
u.delete('a')

// Delete from search only
u.delete('a', 'search')

// Delete from hash only
u.delete('a', 'hash')
```

### Hash Path Operations

```js
const u = new Url('https://example.com#/path/to/page?id=123')

// Get hash path (part between # and ?)
u.getHashPath() // '/path/to/page'

// Set hash path
u.setHashPath('/new/path')
u.toURL() // 'https://example.com/#/new/path?id=123'
```

### Static Methods

```js
// Parse query string
Url.parse('?a=1&b=true')
// { a: '1', b: 'true' }

Url.parse('?a=1&b=true', { convert: true })
// { a: 1, b: true }

// Stringify to query string
Url.stringify({ a: 1, b: true })
// '?a=1&b=true'

// Extract URL parts
Url.getOrigin('https://example.com:8080/path') // 'https://example.com:8080'
Url.getHost('https://example.com:8080/path') // 'example.com:8080'
Url.getPathname('https://example.com/api/users') // '/api/users'

// Create from current page URL (browser environment)
const u = Url.current()

// Create from query string
const u = Url.fromQueryString('a=1&b=2')
u.get('a') // '1'
```

### Iterator Support

```js
const u = new Url('https://a.cn/?ss=1#/path?bb=343')

// Use for...of
for (const [key, value] of u) {
  console.log(key, value)
}

// Spread to array
;[...u] // [['ss', '1'], ['bb', '343']]
```

## Features

- **URL Properties** - Direct access to origin, host, hostname, pathname, search, hash
- **Dual Parameter Support** - Handle both search and hash parameters
- **Priority Control** - Hash takes priority when reading to avoid conflicts
- **Source Tracking** - `toDetailObject()` tracks parameter sources
- **Chainable API** - All write methods return `this`
- **Path Builder** - `path()` method for building paths
- **Full Iterator Support** - Supports `for...of` and spread operator
- **Native Compatible** - API design follows `URLSearchParams`

## Comparison with Native URLSearchParams

| Feature                     | URLSearchParams | Url |
| --------------------------- | --------------- | --- |
| search params               | ✅              | ✅  |
| hash params                 | ❌              | ✅  |
| URL properties              | ❌              | ✅  |
| Parameter scope distinction | ❌              | ✅  |
| Source tracking             | ❌              | ✅  |
| Hash path operations        | ❌              | ✅  |
| Auto URL building           | ❌              | ✅  |
| Chainable API               | ❌              | ✅  |

## Related

- [url](/api/url/url) - URL namespace with parse/stringify methods
- [getDirParams](/api/url/get-dir-params) - Get URL path segments
