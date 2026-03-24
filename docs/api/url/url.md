# url & Url <Badge type="tip" text="since v6.0.0" />

Chainable URL builder and URLSearchParams-like API for URL parsing and manipulation.

## Installation

```bash
pnpm add js-cool
```

## Usage

```js
// Full import from main entry
import { url, Url } from 'js-cool'

// Or import specific functions (with descriptive names)
import {
  parseQueryString,
  stringifyQueryString,
  getQueryParamValue,
  setQueryParam,
  getOrigin
} from 'js-cool'
```

## Three Ways to Use

### 1. Url Class (Chainable Builder)

The `Url` class provides a chainable API for building and manipulating URLs.

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
  .path('users', '123', 'profile')
  .set('fields', 'name,email')
  .setHash('section')
  .toString()
// 'https://api.example.com/users/123/profile?fields=name,email#section'
```

### 2. url Namespace (Factory + Static Methods)

The `url` namespace provides a factory method and static utility functions.

```js
import { url } from 'js-cool'

// Factory method - creates Url instance
url.from('https://example.com?id=123').get('id') // '123'

url.from('https://example.com').set('page', 1).set('size', 10).toString()
// 'https://example.com?page=1&size=10'

// Static utility methods
url.parse('?a=1&b=true', { covert: true }) // { a: 1, b: true }
url.stringify({ a: 1, b: 2 }) // '?a=1&b=2'
url.getOrigin('https://example.com:8080/path') // 'https://example.com:8080'
```

### 3. Direct Function Imports

Import specific functions for smaller bundle sizes.

```js
import {
  getQueryParamValue,
  setQueryParam,
  hasQueryParam,
  appendQueryParam,
  deleteParam,
  parseQueryString,
  stringifyQueryString,
  getOrigin,
  getHost,
  getHostname,
} from 'js-cool'

getQueryParamValue('id', 'https://example.com?id=123') // '123'
setQueryParam('page', 2, 'https://example.com') // 'https://example.com/?page=2'
```

## Url Class API

### Constructor

```js
const u = new Url() // Empty instance
const u = new Url('https://example.com?id=123') // With URL string
```

### URLSearchParams-like Methods

```js
const u = new Url('https://example.com?id=1&id=2&page=1')

// Get single value
u.get('id') // '1' (first value)

// Get all values
u.getAll('id') // ['1', '2']

// Check existence
u.has('id') // true
u.has('token') // false

// Set (chainable)
u.set('page', 2) // Returns this for chaining

// Append (chainable)
u.append('id', '3') // Adds id=3

// Delete (chainable)
u.delete('token') // Returns this for chaining

// Iteration
u.keys() // ['id', 'page']
u.values() // ['1', '2']
u.entries() // [['id', '1'], ['id', '2'], ['page', '1']]
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

// Preserves search and hash
u.set('key', 'value').setHash('section').path('api', 'users')
// 'https://example.com/api/users?key=value#section'
```

### Hash Manipulation

```js
const u = new Url('https://example.com')

// Set hash (chainable)
u.setHash('section') // 'https://example.com#section'

// Replace existing hash
u.setHash('new-section') // 'https://example.com#new-section'
```

### Parse & Convert

```js
const u = new Url('https://example.com?a=1&b=true&page=2')

// Parse query string
u.parse() // { a: '1', b: 'true', page: '2' }
u.parse({ covert: true }) // { a: 1, b: true, page: 2 }

// Get params as object
u.toParams() // { a: '1', b: 'true', page: '2' }

// Convert to string
u.toString() // 'https://example.com?a=1&b=true&page=2'
```

## url Namespace API

### Factory Method

```js
// Create Url instance
const u = url.from('https://example.com?id=123')
u.get('id') // '123'
```

### URLSearchParams-like Methods (Static)

```js
// Get single value
url.get('id', 'https://example.com?id=123') // '123'
url.get('missing', 'https://example.com?id=123') // null

// Get all values
url.getAll('id', 'https://example.com?id=1&id=2') // ['1', '2']

// Check existence
url.has('token', 'https://example.com?token=abc') // true

// Set parameter (returns new URL string)
url.set('page', 2, 'https://example.com') // 'https://example.com/?page=2'
url.set('page', 3, 'https://example.com?page=1') // 'https://example.com/?page=3'

// Append parameter
url.append('id', 2, 'https://example.com?id=1') // 'https://example.com/?id=1&id=2'

// Delete parameter
url.delete('token', 'https://example.com?token=abc&id=1') // 'https://example.com/?id=1'

// Iteration
url.keys('https://example.com?a=1&b=2') // ['a', 'b']
url.values('https://example.com?a=1&b=2') // ['1', '2']
url.entries('https://example.com?a=1&b=2') // [['a', '1'], ['b', '2']]
```

### URL Property Extraction (Static)

```js
// Origin (protocol + host)
url.getOrigin('https://example.com:8080/path') // 'https://example.com:8080'
url.getOrigin('/relative/path') // '' (empty for relative URLs)

// Host (hostname + port)
url.getHost('https://example.com:8080/path') // 'example.com:8080'

// Hostname (without port)
url.getHostname('https://example.com:8080/path') // 'example.com'

// Pathname
url.getPathname('https://example.com/api/users?id=1') // '/api/users'

// Search (query string with ?)
url.getSearch('https://example.com?key=value') // '?key=value'

// Hash (with #)
url.getHash('https://example.com/path#section') // '#section'
```

### Parse & Stringify

```js
// Parse query string to object
url.parse('?a=1&b=2&c=true')
// { a: '1', b: '2', c: 'true' }

// With type conversion
url.parse('?a=1&b=true&c=null', { covert: true })
// { a: 1, b: true, c: null }

// Build query string from object
url.stringify({ a: 1, b: 2 }) // '?a=1&b=2'

// Without ? prefix
url.stringify({ a: 1 }, { withQuestionMark: false }) // 'a=1'

// With URI encoding
url.stringify({ name: 'hello world' }, { encode: true }) // '?name=hello%20world'
```

### Constants

```js
// URL parsing patterns
url.PATTERNS // URL_PATTERNS object

// Value conversion map
url.VALUE_MAP // { 'true': true, 'false': false, 'null': null, ... }
```

## Types

```ts
import type { URLPatternName, URLInput, ParseOptions, StringifyOptions } from 'js-cool'

// Parse options
interface ParseOptions {
  /** Convert special values (true/false/null/undefined/number) */
  covert?: boolean
}

// Stringify options
interface StringifyOptions {
  /** Convert null/undefined to empty string */
  covert?: boolean
  /** URI encode values */
  encode?: boolean
  /** Include ? prefix */
  withQuestionMark?: boolean
}

// URL input type
type URLInput = string | URL
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

### Pagination Helper

```js
import { url } from 'js-cool'

function buildPaginationUrl(baseUrl, page, size, filters = {}) {
  return url
    .from(baseUrl)
    .set('page', page)
    .set('size', size)
    .set('filters', JSON.stringify(filters))
    .toString()
}

buildPaginationUrl('https://api.example.com/users', 1, 20, { status: 'active' })
```

### Query String Parsing

```js
import { url } from 'js-cool'

// From current page URL
const params = url.parse(location.search, { covert: true })
// { page: 1, size: 20, active: true }

// From any URL
const { page, size } = url.parse('?page=2&size=10', { covert: true })
```

### URL Manipulation

```js
import { url } from 'js-cool'

// Remove tracking parameters
let cleanUrl = 'https://example.com/page?id=123&utm_source=google&utm_campaign=ads'
cleanUrl = url.delete('utm_source', cleanUrl)
cleanUrl = url.delete('utm_campaign', cleanUrl)
// 'https://example.com/page?id=123'

// Add parameters
const newUrl = url.set('ref', 'email', cleanUrl)
// 'https://example.com/page?id=123&ref=email'
```

## Migration from v5.x

The URL utilities are new in v6.0.0. No migration needed for existing functions like `getUrlParam`, `parseUrlParam`, etc. - they continue to work as before.

See the [Migration Guide](../../guide/migration.md#url-utilities) for details.
