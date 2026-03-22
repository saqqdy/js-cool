# sampleSize <Badge type="info" text="since v6.0.0" />

Gets n random elements at unique keys from array up to the size of array.

## Usage

```js
import { sampleSize } from 'js-cool'
```

## Signature

```typescript
function sampleSize<T>(array: T[], n?: number): T[]
```

## Parameters

| Parameter | Type     | Description                                     |
| --------- | -------- | ----------------------------------------------- |
| `array`   | `T[]`    | The array to sample from                        |
| `n`       | `number` | The number of elements to sample (default: `1`) |

## Returns

`T[]` - An array of n random elements.

## Examples

```js
sampleSize([1, 2, 3, 4, 5], 2)
// [3, 1] (2 random elements)

sampleSize([1, 2, 3], 4)
// [2, 3, 1] (all elements shuffled, since n > array.length)

sampleSize(['a', 'b', 'c'], 2)
// ['c', 'a'] (2 random elements)
```

## Notes

- Returns an empty array if the input is not an array or is empty
- If n is greater than the array length, returns all elements shuffled
- Uses Fisher-Yates shuffle algorithm for partial selection
- Each element can only appear once in the result

## Related

- [sample](./sample.md)
- [shuffle](./shuffle.md)
