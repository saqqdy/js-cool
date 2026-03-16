# setProperty

Safely set a nested property value.

## Usage

```js
import { setProperty } from 'js-cool'
```

## Signature

```typescript
function setProperty(obj: any, path: string, value: any): void
```

## Parameters

| Parameter | Type     | Description                  |
| --------- | -------- | ---------------------------- |
| `obj`     | `any`    | Target object                |
| `path`    | `string` | Property path (e.g. 'a.b.c') |
| `value`   | `any`    | Value to set                 |

## Examples

```js
const obj = {}
setProperty(obj, 'a.b.c', 1)
// obj = { a: { b: { c: 1 } } }

setProperty(obj, 'users.0.name', 'John')
// obj.users[0].name = 'John'
```

## Related

- [getProperty](/api/object/get-property) - Get nested property
