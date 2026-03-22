# getProperty

Safely get a nested property value.

## Usage

```js
import { getProperty } from 'js-cool'
```

## Signature

```typescript
function getProperty(obj: any, path: string, defaultValue?: any): any
```

## Parameters

| Parameter      | Type     | Description                  |
| -------------- | -------- | ---------------------------- |
| `obj`          | `any`    | Source object                |
| `path`         | `string` | Property path (e.g. 'a.b.c') |
| `defaultValue` | `any`    | Default if not found         |

## Returns

`any` - The property value or default.

## Examples

```js
const obj = { a: { b: { c: 1 } } }

getProperty(obj, 'a.b.c') // 1
getProperty(obj, 'a.b.d', 'default') // 'default'
getProperty(obj, 'x.y.z') // undefined
```

## Related

- [setProperty](/api/object/set-property) - Set nested property
