# delSession

Delete item from sessionStorage.

## Usage

```js
import { delSession } from 'js-cool'
```

## Signature

```typescript
function delSession(key: string): void
```

## Parameters

| Parameter | Type     | Description   |
| --------- | -------- | ------------- |
| `key`     | `string` | Key to delete |

## Examples

```js
setSession('token', 'abc123')
delSession('token')
getSession('token') // null
```

## Related

- [setSession](/api/storage/set-session) - Set session item
- [getSession](/api/storage/get-session) - Get session item
