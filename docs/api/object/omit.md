# omit <Badge type="info" text="since v6.0.0" />

Creates an object composed of the own and inherited enumerable property paths of object that are not omitted.

## Usage

```js
import { omit } from 'js-cool'
```

## Signature

```typescript
function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>
```

## Parameters

| Parameter | Type  | Description                |
| --------- | ----- | -------------------------- |
| `obj`     | `T`   | The source object          |
| `keys`    | `K[]` | The property paths to omit |

## Returns

`Omit<T, K>` - A new object with the specified keys omitted.

## Examples

```js
const object = { a: 1, b: 2, c: 3 }

omit(object, ['a', 'c'])
// => { b: 2 }

omit(object, ['a'])
// => { b: 2, c: 3 }
```

## Related

- [pick](./pick.md) - Create an object with only the specified keys
