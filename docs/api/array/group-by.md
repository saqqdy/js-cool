# groupBy

Creates an object composed of keys generated from the results of running each element of collection thru iteratee.

## Usage

```js
import { groupBy } from 'js-cool'
```

## Signature

```typescript
function groupBy<T>(
  array: T[],
  iteratee: keyof T | ((value: T) => string | number)
): Record<string, T[]>
```

## Parameters

| Parameter   | Type                                    | Description                          |
| ----------- | --------------------------------------- | ------------------------------------ |
| `array`     | `T[]`                                   | The array to iterate over            |
| `iteratee`  | `keyof T \| ((value: T) => string \| number)` | The iteratee to transform keys |

## Returns

`Record<string, T[]>` - The composed aggregate object where each key is an array of elements.

## Examples

```js
groupBy([{ a: 1 }, { a: 2 }, { a: 1 }], 'a')
// { '1': [{ a: 1 }, { a: 1 }], '2': [{ a: 2 }] }

groupBy([6.1, 4.2, 6.3], Math.floor)
// { '4': [4.2], '6': [6.1, 6.3] }

groupBy(['one', 'two', 'three'], 'length')
// { '3': ['one', 'two'], '5': ['three'] }
```

## Notes

- Returns an empty object if the input is not an array
- The iteratee can be a property name or a function
- Keys are converted to strings in the resulting object

## Related

- [keyBy](./key-by.md)
