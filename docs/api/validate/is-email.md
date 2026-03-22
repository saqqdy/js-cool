# isEmail <Badge type="info" text="since v6.0.0" />

Check if string is a valid email address.

## Usage

```js
import { isEmail } from 'js-cool'
```

## Signature

```typescript
function isEmail(value: string): boolean
```

## Parameters

| Parameter | Type     | Description         |
| --------- | -------- | ------------------- |
| `value`   | `string` | The string to check |

## Returns

`boolean` - Returns `true` if string is a valid email, `false` otherwise.

## Examples

```js
isEmail('test@example.com') // true
isEmail('test.name@example.co.uk') // true
isEmail('invalid-email') // false
isEmail('test@') // false
```

## Related

- [isPhone](/api/validate/is-phone) - Phone number validation
- [isURL](/api/validate/is-url) - URL validation
