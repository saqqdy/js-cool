# getCache

Get an item from localStorage.

## Usage

```js
import { getCache } from 'js-cool'
```

## Signature

```typescript
function getCache<T = any>(key: string): T | null
```

## Parameters

| Parameter | Type     | Description    |
| --------- | -------- | -------------- |
| `key`     | `string` | The key to get |

## Returns

`T | null` - The cached value, or `null` if not found or expired.

## Examples

```js
// Get cached value
const user = getCache('user') // { name: 'John' }

// Get with type
interface User {
  name: string
  age: number
}
const typedUser = getCache<User>('user')

// Returns null if expired
setCache('token', 'abc', 1) // 1 second
setTimeout(() => {
  getCache('token') // null (expired)
}, 2000)
```

## Notes

- Returns `null` if key doesn't exist
- Returns `null` if item has expired (also removes it)
- Automatically parses JSON

## Related

- [setCache](/api/storage/set-cache) - Set cached item
- [delCache](/api/storage/del-cache) - Delete cached item
