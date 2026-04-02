# mergeWith <Badge type="info" text="v6.0.0" />

Merge objects with a custom strategy function.

## Usage

```js
import { mergeWith } from 'js-cool'
```

## Signature

```typescript
function mergeWith<T extends Record<string, unknown>>(
  object: T,
  ...sources: [...sources: Record<string, unknown>[], strategy: MergeStrategy]
): T

type MergeStrategy = (
  objValue: unknown,
  srcValue: unknown,
  key: string | number,
  object: Record<string, unknown> | unknown[],
  source: Record<string, unknown> | unknown[]
) => unknown
```

## Parameters

| Parameter  | Type             | Description                    |
| ---------- | ---------------- | ------------------------------ |
| `object`   | `T`              | The destination object         |
| `sources`  | `object[]`       | The source objects             |
| `strategy` | `MergeStrategy`  | The function to customize merge behavior |

## Returns

`T` - The merged object.

## Examples

```js
// Custom array merge (concat instead of replace)
mergeWith(
  { a: [1, 2] },
  { a: [3, 4] },
  (objValue, srcValue) => {
    if (Array.isArray(objValue)) {
      return objValue.concat(srcValue)
    }
  }
)
// { a: [1, 2, 3, 4] }

// Custom merge with function
mergeWith(
  { a: 1, b: 2 },
  { a: 3, c: 4 },
  (objValue, srcValue, key) => {
    if (key === 'a') return objValue + srcValue
  }
)
// { a: 4, b: 2, c: 4 }

// Merge multiple objects
mergeWith(
  { a: 1 },
  { b: 2 },
  { c: 3 },
  (objValue, srcValue) => srcValue ?? objValue
)
// { a: 1, b: 2, c: 3 }

// Skip certain properties
mergeWith(
  { a: 1, b: 2 },
  { a: 10, b: 20, c: 30 },
  (objValue, srcValue, key) => {
    if (key === 'b') return objValue // keep original
  }
)
// { a: 10, b: 2, c: 30 }
```

## Notes

- When the strategy function returns `undefined`, default merge behavior is used
- Nested objects recursively call the strategy function
- Arrays are replaced by default, not concatenated
