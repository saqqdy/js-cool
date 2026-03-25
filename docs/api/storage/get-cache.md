# getCache <Badge type="info" text="since v1.0.2" />

Get an item from localStorage with type inference.

## Usage

```ts
import { getCache } from 'js-cool'
```

## Signature

```typescript
function getCache<T = unknown>(key: string): T | null
```

## Parameters

| Parameter | Type     | Description    |
| --------- | -------- | -------------- |
| `key`     | `string` | The key to get |

## Returns

`T | null` - The cached value, or `null` if not found, expired, or unavailable.

## Examples

### Basic Usage

```ts
// Set and get
setCache('user', { name: 'John' })
const user = getCache('user') // { name: 'John' }

// Get with type inference
interface User {
  name: string
  age: number
}
const typedUser = getCache<User>('user') // User | null

// Non-existent key
getCache('nonexistent') // null
```

### With Expiration

```ts
// Set with 1 second expiration
setCache('token', 'abc123', 1)

getCache('token') // 'abc123' (immediately)

setTimeout(() => {
  getCache('token') // null (expired, auto-removed)
}, 2000)
```

### Different Data Types

```ts
// Number
setCache('count', 42)
getCache<number>('count') // 42

// Array
setCache('items', [1, 2, 3])
getCache<number[]>('items') // [1, 2, 3]

// Null value
setCache('empty', null)
getCache('empty') // null
```

## Notes

- Returns `null` if key doesn't exist
- Returns `null` if localStorage is unavailable (private browsing, SSR)
- Returns `null` if item has expired (also removes expired item)
- Automatically parses JSON
- Supports legacy raw JSON data (without CacheData wrapper)

## Related

- [setCache](/api/storage/set-cache) - Set cached item
- [delCache](/api/storage/del-cache) - Delete cached item
