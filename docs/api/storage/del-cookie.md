# delCookie

Delete a cookie.

## Usage

```js
import { delCookie } from 'js-cool'
```

## Signature

```typescript
function delCookie(name: string): void
```

## Parameters

| Parameter | Type     | Description |
| --------- | -------- | ----------- |
| `name`    | `string` | Cookie name |

## Examples

```js
setCookie('token', 'abc123')
delCookie('token')
getCookie('token') // null
```

## Related

- [setCookie](/api/storage/set-cookie) - Set cookie
- [getCookie](/api/storage/get-cookie) - Get cookie
