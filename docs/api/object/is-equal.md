# isEqual <Badge type="info" text="since v5.12.0" />

Perform deep equality comparison between two values.

## Usage

```ts
import { isEqual } from 'js-cool'
```

## Signature

```typescript
function isEqual<T, P>(a: T, b: P): boolean
```

## Parameters

| Parameter | Type | Description  |
| --------- | ---- | ------------ |
| `a`       | `T`  | First value  |
| `b`       | `P`  | Second value |

## Returns

`boolean` - `true` if values are deeply equal, `false` otherwise.

## Supported Types

- **Primitives**: number, string, boolean, null, undefined
- **Objects**: deep property comparison
- **Arrays**: order-sensitive comparison
- **Date**: compared by timestamp
- **RegExp**: compared by source and flags
- **Circular references**: handled correctly
- **NaN**: `NaN` equals `NaN`

## Examples

### Primitives

```ts
isEqual(1, 1)           // true
isEqual('a', 'a')       // true
isEqual(true, true)     // true
isEqual(NaN, NaN)       // true
isEqual(0, -0)          // false (distinguishes +0 and -0)
```

### Objects

```ts
isEqual({ a: 1 }, { a: 1 })               // true
isEqual({ a: 1, b: 2 }, { b: 2, a: 1 })   // true (property order doesn't matter)
isEqual({ a: { b: 1 } }, { a: { b: 1 } }) // true (deep comparison)
isEqual({ a: 1 }, { a: 1, b: 2 })         // false
```

### Arrays

```ts
isEqual([1, 2, 3], [1, 2, 3])   // true
isEqual([1, 2], [2, 1])         // false (order matters)
isEqual([[1], [2]], [[1], [2]]) // true (nested arrays)
```

### Dates

```ts
const date1 = new Date('2024-01-01')
const date2 = new Date('2024-01-01')
isEqual(date1, date2)  // true
```

### RegExp

```ts
isEqual(/test/gi, /test/gi)  // true
isEqual(/test/g, /test/i)    // false
```

### Circular References

```ts
const a: any = { x: 1 }
a.self = a
const b: any = { x: 1 }
b.self = b
isEqual(a, b)  // true
```

## Notes

- `+0` and `-0` are considered different values
- `NaN` equals `NaN` (unlike standard JavaScript)
- Object property order doesn't affect comparison
- Array element order does affect comparison

## Related

- [clone](/api/object/clone) - Deep clone an object
