# pick <Badge type="info" text="since v6.0.0" />

Creates an object composed of the picked object properties.

## Usage

```js
import { pick } from 'js-cool'
```

## Signature

```typescript
function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>
```

## Parameters

| Parameter | Type  | Description                |
| --------- | ----- | -------------------------- |
| `obj`     | `T`   | The source object          |
| `keys`    | `K[]` | The property paths to pick |

## Returns

`Pick<T, K>` - A new object with only the picked properties.

## Examples

```js
const object = { a: 1, b: 2, c: 3 }

pick(object, ['a', 'c'])
// => { a: 1, c: 3 }

pick(object, ['a'])
// => { a: 1 }
```

## Related

- [omit](./omit.md) - Create an object without the specified keys
