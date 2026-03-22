# clone

Deep clone an object or array.

## Usage

```js
import { clone } from 'js-cool'
```

## Signature

```typescript
function clone<T>(source: T): T
```

## Parameters

| Parameter | Type | Description        |
| --------- | ---- | ------------------ |
| `source`  | `T`  | The value to clone |

## Returns

`T` - A deep copy of the source value.

## Examples

```js
// Clone object
const obj = { a: { b: 1 } }
const cloned = clone(obj)
cloned.a.b = 2
console.log(obj.a.b) // 1 (unchanged)

// Clone array
const arr = [
  [1, 2],
  [3, 4],
]
const clonedArr = clone(arr)
clonedArr[0][0] = 99
console.log(arr[0][0]) // 1 (unchanged)

// Clone Date
const date = new Date()
const clonedDate = clone(date)
```

## Notes

- Handles circular references
- Supports: Object, Array, Date, RegExp, Map, Set
- Returns primitives as-is (no copy needed)
