# union <Badge type="info" text="since v2.2.1" />

Get the union of multiple arrays.

## Usage

```js
import { union } from 'js-cool'
```

## Signature

```typescript
function union<T>(...args: T[][]): T[]
```

## Parameters

| Parameter | Type    | Description     |
| --------- | ------- | --------------- |
| `args`    | `T[][]` | Arrays to union |

## Returns

`T[]` - All unique elements from all arrays.

## Examples

```js
union([1, 2, 3], [3, 4, 5]) // [1, 2, 3, 4, 5]
union([1, 2], [2, 3], [3, 4]) // [1, 2, 3, 4]
union(['a', 'b'], ['b', 'c']) // ['a', 'b', 'c']
```

## Related

- [intersect](/api/array/intersect) - Array intersection
- [unique](/api/array/unique) - Remove duplicates
