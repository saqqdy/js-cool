# Storage Module <Badge type="info" text="since v6.0.0" />

The `storage` module provides a unified API for browser storage with expiration support, generic types, and error handling.

## Import

```ts
// From main package
import { storage, local, session, cookie } from 'js-cool'

// From subpath (recommended for tree-shaking)
import { storage, local, session, cookie } from 'js-cool/storage'

// Import types
import type { StorageOptions, CookieOptions, CookieDeleteOptions, StorageAPI, CookieAPI, StorageNamespace } from 'js-cool/storage'

// Import error classes
import { StorageQuotaError, StorageUnavailableError } from 'js-cool/storage'
```

## Overview

```ts
const storage: StorageNamespace = {
  local: StorageAPI,    // localStorage
  session: StorageAPI,  // sessionStorage
  cookie: CookieAPI     // Cookie
}
```

## storage.local

localStorage API with expiration and generic type support.

### Methods

#### set\<T\>(key, value, options?)

Set an item in localStorage.

```ts
storage.local.set('name', 'John')
storage.local.set('token', 'abc', { expires: 3600 }) // 1 hour

interface User { id: number; name: string }
storage.local.set<User>('user', { id: 1, name: 'John' })
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `key` | `string` | Storage key |
| `value` | `T` | Value to store (JSON serializable) |
| `options` | `StorageOptions` | Optional: `{ expires?: number }` (seconds) |

**Throws:**

| Error | Condition |
|-------|-----------|
| `StorageUnavailableError` | localStorage is not available (SSR, private mode) |
| `StorageQuotaError` | Storage quota exceeded |

#### get\<T\>(key): T | null

Get an item from localStorage.

```ts
const name = storage.local.get('name')
const user = storage.local.get<User>('user')
```

**Returns:** `T | null` - The stored value or `null` if not found or expired.

#### delete(key): void

Delete an item from localStorage.

```ts
storage.local.delete('name')
```

#### has(key): boolean

Check if a key exists.

```ts
storage.local.has('name') // true
```

#### keys(): string[]

Get all storage keys.

```ts
storage.local.keys() // ['user', 'token', ...]
```

#### clear(): void

Clear all localStorage items.

```ts
storage.local.clear()
```

#### length (readonly)

Get the number of stored items.

```ts
storage.local.length // 3
```

## storage.session

sessionStorage API with the same interface as `storage.local`.

```ts
storage.session.set('temp', 'value', { expires: 1800 })
const temp = storage.session.get('temp')
storage.session.delete('temp')
storage.session.has('temp')
storage.session.keys()
storage.session.clear()
storage.session.length
```

## storage.cookie

Cookie API with full options support.

### Methods

#### set(name, value, options?)

Set a cookie.

```ts
// Basic (expires in 1 day)
storage.cookie.set('token', 'abc123')

// With options
storage.cookie.set('session', 'xyz', {
  expires: 86400,        // 1 day in seconds
  path: '/',             // Cookie path
  domain: '.example.com', // Cookie domain
  secure: true,          // HTTPS only
  sameSite: 'Strict'     // SameSite policy
})
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `name` | `string` | Cookie name |
| `value` | `string \| number \| boolean` | Cookie value |
| `options` | `CookieOptions` | Cookie options |

**CookieOptions:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `expires` | `number` | `86400` | Expiration in seconds |
| `path` | `string` | `'/'` | Cookie path |
| `domain` | `string` | - | Cookie domain |
| `secure` | `boolean` | `false` | HTTPS only |
| `sameSite` | `'Strict' \| 'Lax' \| 'None'` | - | SameSite policy |

::: warning SameSite=None
`SameSite=None` requires `secure: true` to work.
:::

#### get(name): string | null

Get a cookie value.

```ts
const token = storage.cookie.get('token')
```

#### getAll(): Record\<string, string\>

Get all cookies as an object.

```ts
storage.cookie.getAll()
// { token: 'abc123', session: 'xyz' }
```

#### delete(name, options?): void

Delete a cookie.

```ts
storage.cookie.delete('token')

// With matching path/domain
storage.cookie.delete('session', {
  path: '/app',
  domain: '.example.com'
})
```

::: warning Delete Options
When deleting a cookie, `path` and `domain` must match the values used when setting.
:::

#### has(name): boolean

Check if a cookie exists.

```ts
storage.cookie.has('token') // true
```

#### clear(): void

Clear all cookies.

```ts
storage.cookie.clear()
```

## Error Classes

### StorageQuotaError

Thrown when storage quota is exceeded.

```ts
import { StorageQuotaError } from 'js-cool/storage'

try {
  storage.local.set('key', largeData)
} catch (e) {
  if (e instanceof StorageQuotaError) {
    console.error('Storage is full')
  }
}
```

### StorageUnavailableError

Thrown when storage is not available (SSR, private mode, disabled).

```ts
import { StorageUnavailableError } from 'js-cool/storage'

try {
  storage.local.set('key', 'value')
} catch (e) {
  if (e instanceof StorageUnavailableError) {
    console.error('Storage not available')
  }
}
```

## Types

```ts
interface StorageOptions {
  /** Expiration time in seconds */
  expires?: number
}

interface CookieOptions {
  /** Expiration in seconds (default: 86400 = 1 day) */
  expires?: number
  /** Cookie path (default: '/') */
  path?: string
  /** Cookie domain */
  domain?: string
  /** HTTPS only */
  secure?: boolean
  /** SameSite policy */
  sameSite?: 'Strict' | 'Lax' | 'None'
}

interface CookieDeleteOptions {
  path?: string
  domain?: string
}

interface StorageAPI {
  set<T>(name: string, value: T, options?: StorageOptions): void
  get<T>(name: string): T | null
  delete(name: string): void
  has(name: string): boolean
  keys(): string[]
  clear(): void
  readonly length: number
}

interface CookieAPI {
  set(name: string, value: string | number | boolean, options?: CookieOptions): void
  get(name: string): string | null
  getAll(): Record<string, string>
  delete(name: string, options?: CookieDeleteOptions): void
  has(name: string): boolean
  clear(): void
}

interface StorageNamespace {
  readonly local: StorageAPI
  readonly session: StorageAPI
  readonly cookie: CookieAPI
}
```

## Migration from v5.x

| v5.x | v6.x |
|------|------|
| `setCache(k, v)` | `storage.local.set(k, v)` |
| `setCache(k, v, s)` | `storage.local.set(k, v, { expires: s })` |
| `getCache(k)` | `storage.local.get(k)` |
| `delCache(k)` | `storage.local.delete(k)` |
| `setSession(k, v)` | `storage.session.set(k, v)` |
| `getSession(k)` | `storage.session.get(k)` |
| `delSession(k)` | `storage.session.delete(k)` |
| `setCookie(k, v, s)` | `storage.cookie.set(k, v, { expires: s })` |
| `getCookie(k)` | `storage.cookie.get(k)` |
| `getCookies()` | `storage.cookie.getAll()` |
| `delCookie(k)` | `storage.cookie.delete(k)` |
