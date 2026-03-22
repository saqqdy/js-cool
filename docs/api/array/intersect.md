# intersect <Badge type="info" text="since v2.2.1" />

Get the intersection of multiple arrays.

## Usage

```js
import { intersect } from 'js-cool'
```

## Signature

```typescript
function intersect<T>(...args: T[][]): T[]
```

## Parameters

| Parameter | Type    | Description         |
| --------- | ------- | ------------------- |
| `args`    | `T[][]` | Arrays to intersect |

## Returns

`T[]` - Elements present in all arrays.

## Examples

```js
intersect([1, 2, 3], [2, 3, 4]) // [2, 3]
intersect([1, 2, 3], [2, 3, 4], [3, 4, 5]) // [3]
intersect(['a', 'b'], ['b', 'c']) // ['b']
```

## Related

- [union](/api/array/union) - Array union
- [minus](/api/array/minus) - Array difference
