# URLParams <Badge type="tip" text="since v6.0.0" />

Enhanced URLSearchParams with support for both search and hash parameters.

## Usage

```js
import { URLParams } from 'js-cool'
```

## Overview

`URLParams` is an enhanced version of `URLSearchParams` that solves the problem where the native `URL` class cannot correctly parse parameters inside the hash fragment.

When a URL contains both search parameters (before `#`) and hash parameters (after `#`), such as `https://a.cn/?ss=1#/path?bb=343`, `URLParams` can handle both types of parameters separately.

## Signature

```typescript
type ParamScope = 'search' | 'hash' | 'all'

class URLParams {
  constructor(url?: string | URL)

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

  // Conversion operations
  toObject(scope?: ParamScope): Record<string, string>
  toDetailObject(): {
    search: Record<string, string>
    hash: Record<string, string>
    all: Record<string, string>
    source: Record<string, 'search' | 'hash' | 'both'>
  }
  toString(scope?: 'search' | 'hash'): string
  toURL(): string

  // Hash path operations
  getHashPath(): string
  setHashPath(path: string): this

  // Iterator
  [Symbol.iterator](): Iterator<[string, string]>

  // Static methods
  static current(): URLParams | null
  static fromQueryString(queryString: string): URLParams
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
const params = new URLParams('https://a.cn/?ss=1#/path?bb=343')

// Auto-find from search + hash (hash priority)
params.get('ss') // '1' (from search)
params.get('bb') // '343' (from hash)
params.has('ss') // true
params.keys() // ['ss', 'bb']
```

### Specify Parameter Scope

```js
const params = new URLParams('https://example.com?token=old#/page?token=new')

// Get from search only
params.get('token', 'search') // 'old'

// Get from hash only
params.get('token', 'hash') // 'new'

// Default (all), hash priority
params.get('token') // 'new'
```

### Get All Parameters

```js
const params = new URLParams('https://a.cn/?ss=1#/path?bb=343')

// Get all parameters object
params.toObject() // { ss: '1', bb: '343' }

// Get search parameters only
params.toObject('search') // { ss: '1' }

// Get hash parameters only
params.toObject('hash') // { bb: '343' }
```

### Detailed Information (Track Source)

```js
const params = new URLParams('https://example.com?token=old#/page?token=new')
params.toDetailObject()
// {
//   search: { token: 'old' },
//   hash: { token: 'new' },
//   all: { token: 'new' },
//   source: { token: 'both' }
// }
```

### Chaining Modifications

```js
const params = new URLParams('https://example.com')
params.set('token', 'abc').set('page', 1).set('id', 123, 'hash')

params.toString() // 'token=abc&page=1'
params.toString('hash') // 'id=123'
params.toURL() // 'https://example.com/?token=abc&page=1#?id=123'
```

### Delete Parameters

```js
const params = new URLParams('https://example.com?a=1#/path?a=2')

// Delete from all scopes
params.delete('a')

// Delete from search only
params.delete('a', 'search')

// Delete from hash only
params.delete('a', 'hash')
```

### Hash Path Operations

```js
const params = new URLParams('https://example.com#/path/to/page?id=123')

// Get hash path (part between # and ?)
params.getHashPath() // '/path/to/page'

// Set hash path
params.setHashPath('/new/path')
params.toURL() // 'https://example.com/#/new/path?id=123'
```

### Static Methods

```js
// Create from current page URL (browser environment)
const params = URLParams.current()

// Create from query string
const params = URLParams.fromQueryString('a=1&b=2')
params.get('a', 'search') // '1'
```

### Iterator Support

```js
const params = new URLParams('https://a.cn/?ss=1#/path?bb=343')

// Use for...of
for (const [key, value] of params) {
  console.log(key, value)
}

// Spread to array
;[...params] // [['ss', '1'], ['bb', '343']]
```

## Features

- **Dual Parameter Support** - Handle both search and hash parameters
- **Priority Control** - Hash takes priority when reading to avoid conflicts
- **Source Tracking** - `toDetailObject()` tracks parameter sources
- **Chaining** - All write methods return `this`
- **Full Iterator Support** - Supports `for...of` and spread operator
- **Native Compatible** - API design follows `URLSearchParams`

## Comparison with Native URLSearchParams

| Feature                     | URLSearchParams | URLParams |
| --------------------------- | --------------- | --------- |
| search params               | ✅              | ✅        |
| hash params                 | ❌              | ✅        |
| Parameter scope distinction | ❌              | ✅        |
| Source tracking             | ❌              | ✅        |
| Hash path operations        | ❌              | ✅        |
| Auto URL building           | ❌              | ✅        |

## Related

- [url](/api/url/url) - URL namespace with parse/stringify methods
- [getDirParams](/api/url/get-dir-params) - Get URL path segments
