# unique <Badge type="info" text="since v2.2.1" />

Remove duplicate values from an array.

## Usage

```js
import { unique } from 'js-cool'
```

## Signature

```typescript
function unique<T>(arr: T[]): T[]
```

## Parameters

| Parameter | Type  | Description              |
| --------- | ----- | ------------------------ |
| `arr`     | `T[]` | The array to deduplicate |

## Returns

`T[]` - A new array with duplicate values removed.

## Examples

```js
unique([1, 2, 2, 3, 3, 4]) // [1, 2, 3, 4]
unique(['a', 'b', 'a', 'c']) // ['a', 'b', 'c']
unique([1, '1', 1]) // [1, '1']
```

## Notes

- Uses strict equality (`===`) for comparison
- Preserves the order of first occurrence
- Returns a new array, does not modify the original
