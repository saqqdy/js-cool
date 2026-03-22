# minus <Badge type="info" text="since v2.2.1" />

Get elements in first array but not in others.

## Usage

```js
import { minus } from 'js-cool'
```

## Signature

```typescript
function minus<T>(...args: T[][]): T[]
```

## Parameters

| Parameter | Type    | Description                  |
| --------- | ------- | ---------------------------- |
| `args`    | `T[][]` | First array minus the others |

## Returns

`T[]` - Elements in first array but not in others.

## Examples

```js
minus([1, 2, 3, 4], [2, 3]) // [1, 4]
minus([1, 2, 3, 4], [2], [4]) // [1, 3]
minus(['a', 'b', 'c'], ['b']) // ['a', 'c']
```

## Related

- [intersect](/api/array/intersect) - Array intersection
- [complement](/api/array/complement) - Array complement
