# isEqual

Deep compare two values.

## Usage

```js
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

`boolean` - `true` if values are deeply equal.

## Examples

```js
// Objects
isEqual({ a: 1 }, { a: 1 }) // true
isEqual({ a: { b: 1 } }, { a: { b: 1 } }) // true

// Arrays
isEqual([1, 2, 3], [1, 2, 3]) // true
isEqual([1, 2], [2, 1]) // false

// Special values
isEqual(NaN, NaN) // true
isEqual(0, -0) // false
```
