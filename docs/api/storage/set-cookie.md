# setCookie <Badge type="info" text="since v1.0.2" />

Set a cookie.

## Usage

```js
import { setCookie } from 'js-cool'
```

## Signature

```typescript
function setCookie<T extends string | number | boolean>(
  name: string,
  value: T,
  seconds?: string | number,
  path?: string,
  samesite?: boolean
): void
```

## Parameters

| Parameter  | Type                          | Description                            |
| ---------- | ----------------------------- | -------------------------------------- |
| `name`     | `string`                      | Cookie name                            |
| `value`    | `string \| number \| boolean` | Cookie value                           |
| `seconds`  | `string \| number`            | Expiration in seconds (default: 86400) |
| `path`     | `string`                      | Cookie path (default: '/')             |
| `samesite` | `boolean`                     | Enable SameSite (default: true)        |

## Examples

```js
// Basic usage (1 day)
setCookie('token', 'xxxxxx')

// Custom expiration (20 seconds)
setCookie('session', 'abc123', 20)

// With path
setCookie('token', 'xxxxxx', 86400, '/app')

// Disable SameSite
setCookie('data', 'value', 86400, '/', false)
```

## Related

- [getCookie](/api/storage/get-cookie) - Get cookie
- [delCookie](/api/storage/del-cookie) - Delete cookie
