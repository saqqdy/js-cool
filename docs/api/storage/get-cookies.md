# getCookies

Get all cookies as an object.

## Usage

```js
import { getCookies } from 'js-cool'
```

## Signature

```typescript
function getCookies(): Record<string, string>
```

## Returns

`Record<string, string>` - Object with all cookies.

## Examples

```js
// All cookies
getCookies()
// { token: 'abc123', session: 'xyz789' }

// Check if cookie exists
const cookies = getCookies()
if ('token' in cookies) {
  console.log('User has token')
}
```

## Related

- [getCookie](/api/storage/get-cookie) - Get single cookie
