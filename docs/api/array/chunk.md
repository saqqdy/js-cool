# chunk <Badge type="info" text="since v6.0.0" />

Creates an array of elements split into groups the length of size.

## Usage

```js
import { chunk } from 'js-cool'
```

## Signature

```typescript
function chunk<T>(array: T[], size?: number): T[][]
```

## Parameters

| Parameter | Type     | Description                             |
| --------- | -------- | --------------------------------------- |
| `array`   | `T[]`    | The array to process                    |
| `size`    | `number` | The length of each chunk (default: `1`) |

## Returns

`T[][]` - A new array of chunks.

## Examples

```js
chunk(['a', 'b', 'c', 'd'], 2)
// [['a', 'b'], ['c', 'd']]

chunk(['a', 'b', 'c', 'd'], 3)
// [['a', 'b', 'c'], ['d']]

chunk(['a', 'b', 'c', 'd'], 1)
// [['a'], ['b'], ['c'], ['d']]
```

## Notes

- Returns an empty array if the input is not an array or is empty
- The size parameter is floored to an integer and minimum value is 1
- The last chunk may be smaller than the specified size

## Related

- [flatten](./flatten.md)
