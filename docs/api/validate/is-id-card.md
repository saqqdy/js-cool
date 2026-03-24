# isIDCard <Badge type="info" text="since v6.0.0" />

Check if string is a valid Chinese ID card number (18-digit).

## Usage

```js
import { isIDCard } from 'js-cool'
```

## Signature

```typescript
function isIDCard(value: string): boolean
```

## Parameters

| Parameter | Type     | Description         |
| --------- | -------- | ------------------- |
| `value`   | `string` | The string to check |

## Returns

`boolean` - Returns `true` if string is a valid Chinese ID card number, `false` otherwise.

## Examples

```js
isIDCard('11010519491231002X') // true
isIDCard('11010519491231002x') // true (lowercase x is also valid)
isIDCard('123456789012345678') // false (invalid checksum)
isIDCard('1234567890') // false (wrong length)
```

## Related

- [isPhone](/api/validate/is-phone) - Phone number validation
- [isCreditCard](/api/validate/is-credit-card) - Credit card validation
