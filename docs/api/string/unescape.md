# unescape <Badge type="info" text="since v5.5.0" />

Unescape HTML entities in a string.

## Usage

```js
import { unescape } from 'js-cool'
```

## Signature

```typescript
function unescape(string: string): string
```

## Parameters

| Parameter | Type     | Description            |
| --------- | -------- | ---------------------- |
| `string`  | `string` | The string to unescape |

## Returns

`string` - The unescaped string.

## Examples

```js
unescape('&lt;div&gt;Hello&lt;/div&gt;') // '<div>Hello</div>'
unescape('a &amp; b') // 'a & b'
unescape('&quot;hello&quot;') // '"hello"'
```

## Related

- [escape](/api/string/escape) - Escape HTML special characters
