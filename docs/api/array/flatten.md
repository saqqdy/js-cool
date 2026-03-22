# flatten

Flattens array a single level deep.

## Usage

```js
import { flatten, flattenDeep } from 'js-cool'
```

## Signature

```typescript
function flatten<T>(array: (T | T[])[]): T[]
function flattenDeep<T>(array: any[]): T[]
```

## Parameters

| Parameter | Type           | Description          |
| --------- | -------------- | -------------------- |
| `array`   | `(T \| T[])[]` | The array to flatten |

## Returns

`T[]` - A new flattened array.

## Examples

```js
flatten([1, [2, 3], [4, [5]]])
// [1, 2, 3, [5]]

flattenDeep([1, [2, [3, [4]], 5]])
// [1, 2, 3, 4, 5]
```

## Notes

- `flatten` only flattens a single level deep
- `flattenDeep` recursively flattens all nested arrays
- Returns an empty array if the input is not an array
- Returns a new array, does not modify the original

## Related

- [chunk](./chunk.md)
