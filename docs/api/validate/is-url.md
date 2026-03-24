# isURL <Badge type="info" text="since v6.0.0" />

Check if string is a valid URL.

## Usage

```js
import { isURL } from 'js-cool'
```

## Signature

```typescript
function isURL(value: string): boolean
```

## Parameters

| Parameter | Type     | Description         |
| --------- | -------- | ------------------- |
| `value`   | `string` | The string to check |

## Returns

`boolean` - Returns `true` if string is a valid URL, `false` otherwise.

## Examples

```js
isURL('https://example.com') // true
isURL('http://localhost:3000/path?query=1') // true
isURL('ftp://ftp.example.com') // true
isURL('invalid-url') // false
isURL('example.com') // false (missing protocol)
```

## Related

- [isEmail](/api/validate/is-email) - Email validation
- [isPhone](/api/validate/is-phone) - Phone number validation
