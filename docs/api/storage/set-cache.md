# setCache <Badge type="info" text="since v1.0.2" />

Set an item in localStorage with optional expiration.

## Usage

```js
import { setCache } from 'js-cool'
```

## Signature

```typescript
function setCache(key: string, value: any, seconds?: number): void
```

## Parameters

| Parameter | Type     | Description                           |
| --------- | -------- | ------------------------------------- |
| `key`     | `string` | The key to set                        |
| `value`   | `any`    | The value to store                    |
| `seconds` | `number` | Expiration time in seconds (optional) |

## Examples

```js
// Set without expiration
setCache('user', { name: 'John' })

// Set with expiration (1 hour)
setCache('token', 'abc123', 3600)

// Set with expiration (24 hours)
setCache('settings', { theme: 'dark' }, 86400)
```

## Notes

- Value is serialized as JSON
- Expiration time is stored alongside the value
- Overwrites existing values

## Related

- [getCache](/api/storage/get-cache) - Get cached item
- [delCache](/api/storage/del-cache) - Delete cached item
