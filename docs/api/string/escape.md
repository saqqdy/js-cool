# escape <Badge type="info" text="since v5.5.0" />

Escape HTML special characters in a string.

## Usage

```js
import { escape } from 'js-cool'
```

## Signature

```typescript
function escape(string: string): string
```

## Parameters

| Parameter | Type     | Description          |
| --------- | -------- | -------------------- |
| `string`  | `string` | The string to escape |

## Returns

`string` - The escaped string.

## Examples

```js
escape('<div>Hello</div>') // '&lt;div&gt;Hello&lt;/div&gt;'
escape('a & b') // 'a &amp; b'
escape('"hello"') // '&quot;hello&quot;'
```

## Related

- [unescape](/api/string/unescape) - Unescape HTML entities
