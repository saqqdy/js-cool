# getCookie

Get a cookie value.

## Usage

```js
import { getCookie } from 'js-cool'
```

## Signature

```typescript
function getCookie(name: string): string | null
```

## Parameters

| Parameter | Type     | Description |
| --------- | -------- | ----------- |
| `name`    | `string` | Cookie name |

## Returns

`string | null` - Cookie value or `null`.

## Examples

```js
setCookie('token', 'abc123')
getCookie('token') // 'abc123'
getCookie('missing') // null
```

## Related

- [setCookie](/api/storage/set-cookie) - Set cookie
- [getCookies](/api/storage/get-cookies) - Get all cookies
