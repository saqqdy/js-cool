# average

Computes the average of the values in array.

## Usage

```js
import { average } from 'js-cool'
```

## Signature

```typescript
function average(array: number[]): number
```

## Parameters

| Parameter | Type       | Description          |
| --------- | ---------- | -------------------- |
| `array`   | `number[]` | The array to iterate over |

## Returns

`number` - The average of the array values.

## Examples

```js
average([1, 2, 3, 4]) // 2.5
average([10, 20, 30]) // 20
average([]) // NaN
average([5]) // 5
```

## Notes

- Returns `NaN` for empty arrays or non-array inputs
- Subject to JavaScript floating-point precision issues

## Related

- [sum](/api/number/sum) - Sum of array
- [round](/api/number/round) - Rounds to precision
