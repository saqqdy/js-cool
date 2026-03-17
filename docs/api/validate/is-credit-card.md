# isCreditCard

Check if string is a valid credit card number using Luhn algorithm.

## Usage

```js
import { isCreditCard } from 'js-cool'
```

## Signature

```typescript
function isCreditCard(value: string): boolean
```

## Parameters

| Parameter | Type     | Description           |
| --------- | -------- | --------------------- |
| `value`   | `string` | The string to check |

## Returns

`boolean` - Returns `true` if string is a valid credit card number, `false` otherwise.

## Examples

```js
isCreditCard('4532015112830366') // true (Visa)
isCreditCard('5555555555554444') // true (MasterCard)
isCreditCard('378282246310005') // true (American Express)
isCreditCard('1234567890123456') // false
```

## Related

- [isIDCard](/api/validate/is-id-card) - Chinese ID card validation
- [isEmail](/api/validate/is-email) - Email validation
