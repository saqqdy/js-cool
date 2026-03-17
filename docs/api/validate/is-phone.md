# isPhone

Check if string is a valid phone number (Chinese mobile).

## Usage

```js
import { isPhone } from 'js-cool'
```

## Signature

```typescript
function isPhone(value: string): boolean
```

## Parameters

| Parameter | Type     | Description           |
| --------- | -------- | --------------------- |
| `value`   | `string` | The string to check |

## Returns

`boolean` - Returns `true` if string is a valid Chinese mobile phone number, `false` otherwise.

## Examples

```js
isPhone('13800138000') // true
isPhone('15912345678') // true
isPhone('12345678901') // false
isPhone('1380013800') // false (too short)
```

## Related

- [isEmail](/api/validate/is-email) - Email validation
- [isIDCard](/api/validate/is-id-card) - Chinese ID card validation
