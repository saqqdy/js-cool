# transform <Badge type="info" text="v6.0.0" />

An alternative to reduce; transforms object to a new accumulator object.

## Usage

```js
import { transform } from 'js-cool'
```

## Signature

```typescript
function transform<T extends Record<string, unknown> | unknown[], R>(
  object: T,
  iteratee: (
    accumulator: R,
    value: T extends (infer U)[] ? U : T[keyof T],
    key: T extends unknown[] ? number : keyof T,
    object: T
  ) => R | boolean | void,
  accumulator?: R
): R
```

## Parameters

| Parameter     | Type       | Description                          |
| ------------- | ---------- | ------------------------------------ |
| `object`      | `T`        | The object to transform              |
| `iteratee`    | `Function` | The function invoked per iteration   |
| `accumulator` | `R`        | The initial accumulator value (default: `{}`) |

## Returns

`R` - The accumulated value.

## Examples

```js
// Transform object to array of values
transform({ a: 1, b: 2, c: 3 }, (result, value, key) => {
  result.push({ key, value })
  return result
}, [])
// [{ key: 'a', value: 1 }, { key: 'b', value: 2 }, { key: 'c', value: 3 }]

// Filter and transform
transform({ a: 1, b: 2, c: 3, d: 4 }, (result, value, key) => {
  if (value % 2 === 0) {
    result[key] = value * 2
  }
}, {})
// { b: 4, d: 8 }

// Early exit by returning false
transform({ a: 1, b: 2, c: 3 }, (result, value, key) => {
  result[key] = value
  if (key === 'b') return false
}, {})
// { a: 1, b: 2 }

// Transform array to object
transform(['a', 'b', 'c'], (result, value, index) => {
  result[value] = index
}, {})
// { a: 0, b: 1, c: 2 }
```

## Notes

- Iteratee can exit early by explicitly returning `false`
- Iteratee return value becomes the new accumulator
- Works with both objects and arrays
