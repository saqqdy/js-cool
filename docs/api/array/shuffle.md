# shuffle

Randomly shuffle an array.

## Usage

```js
import { shuffle } from 'js-cool'
```

## Signature

```typescript
function shuffle<T>(arr: T[]): T[]
```

## Parameters

| Parameter | Type  | Description         |
| --------- | ----- | ------------------- |
| `arr`     | `T[]` | The array to shuffle |

## Returns

`T[]` - A new shuffled array.

## Examples

```js
shuffle([1, 2, 3, 4, 5]) // [3, 1, 5, 2, 4] (random)
shuffle(['a', 'b', 'c']) // ['c', 'a', 'b'] (random)
```

## Notes

- Uses Fisher-Yates shuffle algorithm
- Returns a new array, does not modify the original
- Each permutation is equally likely
