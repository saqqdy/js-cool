# safeStringify

Safely stringify object to JSON.

## Usage

```js
import { safeStringify } from 'js-cool'
```

## Signature

```typescript
function safeStringify(data: any, replacer?: any, space?: number): string | undefined
```

## Parameters

| Parameter  | Type     | Description        |
| ---------- | -------- | ------------------ |
| `data`     | `any`    | Data to stringify  |
| `replacer` | `any`    | Replacer function  |
| `space`    | `number` | Indentation spaces |

## Returns

`string | undefined` - JSON string or `undefined` on error.

## Examples

```js
safeStringify({ a: 1 }) // '{"a":1}'
safeStringify({ a: 1 }, null, 2) // '{\n  "a": 1\n}'
safeStringify(circularRef) // undefined (no error thrown)
```

## Related

- [safeParse](/api/object/safe-parse) - Safe JSON parse
