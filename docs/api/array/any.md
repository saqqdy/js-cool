# any

Check if any element satisfies a condition.

## Usage

```js
import { any } from 'js-cool'
```

## Signature

```typescript
function any<T>(arr: T[], fn: (item: T) => boolean): boolean
```

## Parameters

| Parameter | Type                         | Description          |
| --------- | ---------------------------- | -------------------- |
| `arr`     | `T[]`                        | The array to check   |
| `fn`      | `(item: T) => boolean`       | The test function    |

## Returns

`boolean` - `true` if any element passes the test.

## Examples

```js
any([1, 2, 3], x => x > 2) // true
any([1, 2, 3], x => x > 5) // false
any([], x => x > 0) // false
```

## Related

- [all](/api/array/all) - Check if all elements pass
