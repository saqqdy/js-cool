# isEmpty

Checks if value is an empty object, collection, map, or set.

## Usage

```js
import { isEmpty } from 'js-cool'
```

## Signature

```typescript
function isEmpty(value: unknown): boolean
```

## Parameters

| Parameter | Type      | Description      |
| --------- | --------- | ---------------- |
| `value`   | `unknown` | The value to check |

## Returns

`boolean` - `true` if value is empty, `false` otherwise.

## Examples

```js
isEmpty(null)
// => true

isEmpty(undefined)
// => true

isEmpty('')
// => true

isEmpty([])
// => true

isEmpty({})
// => true

isEmpty('abc')
// => false

isEmpty([1, 2, 3])
// => false

isEmpty({ a: 1 })
// => false

isEmpty(1)
// => false

isEmpty(true)
// => false
```

## Notes

- Returns `true` for `null` and `undefined`
- Returns `true` for empty strings and arrays
- Returns `true` for empty objects, Maps, and Sets
- Returns `false` for numbers, booleans, and other primitives

## Related

- [isNil](./is-nil.md) - Check if value is null or undefined
