# getSession

Get item from sessionStorage.

## Usage

```js
import { getSession } from 'js-cool'
```

## Signature

```typescript
function getSession<T = any>(key: string): T | null
```

## Parameters

| Parameter | Type     | Description |
| --------- | -------- | ----------- |
| `key`     | `string` | Key to get  |

## Returns

`T | null` - The value or `null` if not found/expired.

## Examples

```js
setSession('token', 'abc123', 1800)
getSession('token') // 'abc123'

// After expiration
getSession('token') // null
```

## Related

- [setSession](/api/storage/set-session) - Set session item
- [delSession](/api/storage/del-session) - Delete session item
