# sample <Badge type="info" text="since v6.0.0" />

Gets a random element from an array.

## Usage

```js
import { sample } from 'js-cool'
```

## Signature

```typescript
function sample<T>(array: T[]): T | undefined
```

## Parameters

| Parameter | Type  | Description              |
| --------- | ----- | ------------------------ |
| `array`   | `T[]` | The array to sample from |

## Returns

`T | undefined` - A random element from the array, or `undefined` if the array is empty or not an array.

## Examples

```js
sample([1, 2, 3, 4])
// 2 (random element)

sample(['a', 'b', 'c'])
// 'b' (random element)

sample([])
// undefined
```

## Notes

- Returns `undefined` if the input is not an array or is empty
- Each element has an equal probability of being selected

## Related

- [sampleSize](./sample-size.md)
- [shuffle](./shuffle.md)
