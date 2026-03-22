# extend

Deep merge objects.

## Usage

```js
import { extend } from 'js-cool'
```

## Signature

```typescript
function extend<T extends object>(target: T, ...sources: object[]): T
```

## Parameters

| Parameter | Type       | Description             |
| --------- | ---------- | ----------------------- |
| `target`  | `T`        | The target object       |
| `sources` | `object[]` | Source objects to merge |

## Returns

`T` - The merged target object.

## Examples

```js
// Basic merge
extend({ a: 1 }, { b: 2 }) // { a: 1, b: 2 }

// Deep merge
extend({ a: { b: 1 } }, { a: { c: 2 } })
// { a: { b: 1, c: 2 } }

// Multiple sources
extend({}, { a: 1 }, { b: 2 }, { c: 3 })
// { a: 1, b: 2, c: 3 }
```

## Notes

- Modifies the target object
- Performs deep merge for nested objects
- Arrays are concatenated, not merged
