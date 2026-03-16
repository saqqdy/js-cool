# delCache

Delete item from localStorage.

## Usage

```js
import { delCache } from 'js-cool'
```

## Signature

```typescript
function delCache(key: string): void
```

## Parameters

| Parameter | Type     | Description   |
| --------- | -------- | ------------- |
| `key`     | `string` | Key to delete |

## Examples

```js
setCache('user', { name: 'John' })
delCache('user')
getCache('user') // null
```

## Related

- [setCache](/api/storage/set-cache) - Set cached item
- [getCache](/api/storage/get-cache) - Get cached item
