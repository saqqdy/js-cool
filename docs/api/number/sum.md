# sum <Badge type="info" text="since v6.0.0" />

Computes the sum of the values in array.

## Usage

```js
import { sum } from 'js-cool'
```

## Signature

```typescript
function sum(array: number[]): number
```

## Parameters

| Parameter | Type       | Description               |
| --------- | ---------- | ------------------------- |
| `array`   | `number[]` | The array to iterate over |

## Returns

`number` - The sum of the array values.

## Examples

```js
sum([1, 2, 3, 4]) // 10
sum([0.1, 0.2, 0.3]) // 0.6000000000000001
sum([]) // 0
sum([-1, -2, 3]) // 0
```

## Notes

- Returns `0` for empty arrays or non-array inputs
- Subject to JavaScript floating-point precision issues

## Related

- [average](/api/number/average) - Average of array
- [round](/api/number/round) - Rounds to precision
