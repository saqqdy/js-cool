# safeParse

Safely parse JSON string.

## Usage

```js
import { safeParse } from 'js-cool'
```

## Signature

```typescript
function safeParse<T = any>(json: string): T | null
```

## Parameters

| Parameter | Type     | Description       |
| --------- | -------- | ----------------- |
| `json`    | `string` | JSON string       |

## Returns

`T | null` - Parsed value or `null` on error.

## Examples

```js
safeParse('{"a":1}') // { a: 1 }
safeParse('invalid') // null (no error thrown)
safeParse('null') // null
```

## Related

- [safeStringify](/api/object/safe-stringify) - Safe JSON stringify
