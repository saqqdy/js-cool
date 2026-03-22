# complement <Badge type="info" text="since v2.2.1" />

Get the complement of arrays (elements not in intersection).

## Usage

```js
import { complement } from 'js-cool'
```

## Signature

```typescript
function complement<T>(...args: T[][]): T[]
```

## Parameters

| Parameter | Type    | Description          |
| --------- | ------- | -------------------- |
| `args`    | `T[][]` | Arrays to complement |

## Returns

`T[]` - Elements not in the intersection.

## Examples

```js
complement([1, 2, 3], [2, 3, 4]) // [1, 4]
complement([1, 2], [3, 4]) // [1, 2, 3, 4]
```

## Related

- [intersect](/api/array/intersect) - Array intersection
- [minus](/api/array/minus) - Array difference
