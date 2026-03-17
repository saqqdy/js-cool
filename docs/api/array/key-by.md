# keyBy

Creates an object composed of keys generated from the results of running each element of collection thru iteratee. The corresponding value of each key is the last element responsible for generating the key.

## Usage

```js
import { keyBy } from 'js-cool'
```

## Signature

```typescript
function keyBy<T>(
  array: T[],
  iteratee: keyof T | ((value: T) => string | number)
): Record<string, T>
```

## Parameters

| Parameter   | Type                                    | Description                          |
| ----------- | --------------------------------------- | ------------------------------------ |
| `array`     | `T[]`                                   | The array to iterate over            |
| `iteratee`  | `keyof T \| ((value: T) => string \| number)` | The iteratee to transform keys |

## Returns

`Record<string, T>` - The composed aggregate object where each key maps to a single element.

## Examples

```js
keyBy([{ id: 'a', name: 'Alice' }, { id: 'b', name: 'Bob' }], 'id')
// { a: { id: 'a', name: 'Alice' }, b: { id: 'b', name: 'Bob' } }

keyBy([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }], 'id')
// { '1': { id: 1, name: 'Alice' }, '2': { id: 2, name: 'Bob' } }

keyBy(['a', 'b', 'c'], (v) => v.toUpperCase())
// { A: 'a', B: 'b', C: 'c' }
```

## Notes

- Returns an empty object if the input is not an array
- The iteratee can be a property name or a function
- If duplicate keys exist, the last element with that key is used
- Keys are converted to strings in the resulting object

## Related

- [groupBy](./group-by.md)
