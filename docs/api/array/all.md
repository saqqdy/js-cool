# all

Check if all elements satisfy a condition.

## Usage

```js
import { all } from 'js-cool'
```

## Signature

```typescript
function all<T>(arr: T[], fn: (item: T) => boolean): boolean
```

## Parameters

| Parameter | Type                   | Description        |
| --------- | ---------------------- | ------------------ |
| `arr`     | `T[]`                  | The array to check |
| `fn`      | `(item: T) => boolean` | The test function  |

## Returns

`boolean` - `true` if all elements pass the test.

## Examples

```js
all([1, 2, 3], x => x > 0) // true
all([1, 2, 3], x => x > 1) // false
all([], x => x > 0) // true
```

## Related

- [any](/api/array/any) - Check if any element passes
