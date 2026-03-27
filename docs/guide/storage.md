# Storage Utilities

js-cool provides a unified storage API with expiration support, generic types, and error handling.

## Overview

The `storage` namespace provides consistent APIs for `localStorage`, `sessionStorage`, and `Cookie`:

```js
import { storage } from 'js-cool'

// localStorage
storage.local.set('key', 'value', { expires: 3600 })
storage.local.get('key')

// sessionStorage
storage.session.set('key', 'value', { expires: 60 })
storage.session.get('key')

// Cookie
storage.cookie.set('key', 'value', { expires: 86400, sameSite: 'Strict' })
storage.cookie.get('key')
```

## Subpath Import

For optimal tree-shaking, import from the storage subpath:

```js
import { storage, local, session, cookie } from 'js-cool/storage'
import type { StorageOptions, CookieOptions } from 'js-cool/storage'
```

## LocalStorage

### Basic Usage

```js
import { storage } from 'js-cool'

// Set item
storage.local.set('name', 'John')

// Get item (returns null if not found)
const name = storage.local.get('name')

// Check existence
storage.local.has('name') // true

// Delete item
storage.local.delete('name')

// Get all keys
storage.local.keys() // ['key1', 'key2', ...]

// Get count
storage.local.length // 2

// Clear all
storage.local.clear()
```

### With Expiration

```js
// Set with expiration (in seconds)
storage.local.set('token', 'abc123', { expires: 3600 }) // 1 hour

// Expired items return null automatically
storage.local.get('token') // null if expired
```

### Generic Type Support

```ts
interface User {
  id: number
  name: string
  email: string
}

// Set with type
storage.local.set<User>('user', { id: 1, name: 'John', email: 'john@example.com' })

// Get with type inference
const user = storage.local.get<User>('user')
// user: User | null
```

### Error Handling

```ts
import { storage, StorageQuotaError, StorageUnavailableError } from 'js-cool'

try {
  storage.local.set('key', largeData)
} catch (e) {
  if (e instanceof StorageQuotaError) {
    console.error('Storage quota exceeded')
  } else if (e instanceof StorageUnavailableError) {
    console.error('Storage not available (SSR or private mode)')
  }
}
```

## SessionStorage

Same API as localStorage:

```js
import { storage } from 'js-cool'

// Set item (with optional expiration)
storage.session.set('temp', 'value', { expires: 1800 }) // 30 minutes

// Get item
const temp = storage.session.get('temp')

// Delete item
storage.session.delete('temp')

// Clear all
storage.session.clear()
```

## Cookie

### Basic Usage

```js
import { storage } from 'js-cool'

// Set cookie (expires in 1 day by default)
storage.cookie.set('token', 'abc123')

// Get cookie
const token = storage.cookie.get('token')

// Check existence
storage.cookie.has('token') // true

// Get all cookies
const cookies = storage.cookie.getAll()
// { token: 'abc123', session: 'xyz' }

// Delete cookie
storage.cookie.delete('token')

// Clear all cookies
storage.cookie.clear()
```

### Cookie Options

```js
storage.cookie.set('session', 'xyz', {
  expires: 86400, // Expiration in seconds (default: 86400 = 1 day)
  path: '/', // Cookie path (default: '/')
  domain: '.example.com', // Cookie domain
  secure: true, // Only send over HTTPS
  sameSite: 'Strict', // 'Strict' | 'Lax' | 'None'
})
```

### Deleting Cookies with Options

When deleting a cookie, the `path` and `domain` must match the values used when setting:

```js
// Set with path and domain
storage.cookie.set('session', 'xyz', {
  expires: 86400,
  path: '/app',
  domain: '.example.com',
})

// Delete with matching path and domain
storage.cookie.delete('session', {
  path: '/app',
  domain: '.example.com',
})
```

### SameSite and Secure

`SameSite=None` requires `Secure` to be true:

```js
// For cross-site requests
storage.cookie.set('crossSite', 'value', {
  sameSite: 'None',
  secure: true, // Required for SameSite=None
})
```

## Direct Imports

For convenience, you can also import storage modules directly:

```js
import { local, session, cookie } from 'js-cool'

// Use directly
local.set('key', 'value')
session.set('key', 'value')
cookie.set('key', 'value')
```

## Migration from v5.x

The old individual functions have been replaced by the unified namespace:

| v5.x (Removed)                         | v6.x                                                         |
| -------------------------------------- | ------------------------------------------------------------ |
| `setCache(key, value)`                 | `storage.local.set(key, value)`                              |
| `setCache(key, value, seconds)`        | `storage.local.set(key, value, { expires: seconds })`        |
| `getCache(key)`                        | `storage.local.get(key)`                                     |
| `delCache(key)`                        | `storage.local.delete(key)`                                  |
| `setSession(key, value)`               | `storage.session.set(key, value)`                            |
| `getSession(key)`                      | `storage.session.get(key)`                                   |
| `delSession(key)`                      | `storage.session.delete(key)`                                |
| `setCookie(key, value, seconds)`       | `storage.cookie.set(key, value, { expires: seconds })`       |
| `setCookie(key, value, seconds, path)` | `storage.cookie.set(key, value, { expires: seconds, path })` |
| `getCookie(key)`                       | `storage.cookie.get(key)`                                    |
| `getCookies()`                         | `storage.cookie.getAll()`                                    |
| `delCookie(key)`                       | `storage.cookie.delete(key)`                                 |
| -                                      | `storage.local.has(key)`                                     |
| -                                      | `storage.local.keys()`                                       |
| -                                      | `storage.local.clear()`                                      |
| -                                      | `storage.cookie.has(key)`                                    |
| -                                      | `storage.cookie.clear()`                                     |

### Migration Example

```js
// ========== v5.x ==========
import { setCache, getCache, delCache, setCookie, getCookie } from 'js-cool'

setCache('user', { id: 1, name: 'John' })
setCache('token', 'abc', 3600)
const user = getCache('user')
delCache('token')

setCookie('session', 'xyz', 86400, '/', true)
const session = getCookie('session')

// ========== v6.x ==========
import { storage } from 'js-cool'

storage.local.set('user', { id: 1, name: 'John' })
storage.local.set('token', 'abc', { expires: 3600 })
const user = storage.local.get<{ id: number; name: string }>('user')
storage.local.delete('token')

storage.cookie.set('session', 'xyz', {
  expires: 86400,
  path: '/',
  secure: true,
})
const session = storage.cookie.get('session')
```

## Best Practices

### When to Use What?

| Storage        | Capacity | Expiration | Use Case                      |
| -------------- | -------- | ---------- | ----------------------------- |
| localStorage   | ~5MB     | Manual     | User preferences, cached data |
| sessionStorage | ~5MB     | Tab close  | Temporary session data        |
| Cookie         | ~4KB     | Custom     | Authentication, tracking      |

### Example: User Session

```js
import { storage } from 'js-cool'

// Store user data in localStorage
storage.local.set('userData', userObject, { expires: 86400 })

// Store auth token in cookie
storage.cookie.set('authToken', token, {
  expires: 86400,
  secure: true,
  sameSite: 'Strict',
})

// Check if logged in
function isLoggedIn() {
  return storage.cookie.has('authToken') && storage.local.has('userData')
}

// Logout
function logout() {
  storage.local.delete('userData')
  storage.cookie.delete('authToken')
}
```

### SSR Compatibility

All storage methods handle SSR environments gracefully:

```js
// In SSR (Node.js), these return null/empty without errors
storage.local.get('key') // null
storage.local.keys() // []
storage.local.length // 0
storage.cookie.get('key') // null
storage.cookie.getAll() // {}
```

## See Also

- [Storage API Reference](/api/storage/)
- [Migration Guide](/guide/migration)
