# isDigitals <Badge type="danger" text="deprecated" /> <Badge type="info" text="since v1.0.1" />

::: warning Deprecated
will be removed in the next major release.
:::


Check if string contains only digits.

## Usage

```js
import { isDigitals } from 'js-cool'
```

## Signature

```typescript
function isDigitals(value: string): boolean
```

## Parameters

| Parameter | Type     | Description     |
| --------- | -------- | --------------- |
| `value`   | `string` | String to check |

## Returns

`boolean` - `true` if string is all digits.

## Examples

```js
isDigitals('12345') // true
isDigitals('123.45') // false
isDigitals('abc') // false
isDigitals('') // false
```
