# encodeBase64 <Badge type="info" text="since v1.0.1" />

Encode a string to Base64 format.

## Usage

```js
import { encodeBase64 } from 'js-cool'
```

## Signature

```typescript
function encodeBase64(input: string): string
```

## Parameters

| Parameter | Type     | Description          |
| --------- | -------- | -------------------- |
| `input`   | `string` | The string to encode |

## Returns

`string` - The Base64 encoded string.

## Examples

```js
encodeBase64('Hello World') // 'SGVsbG8gV29ybGQ='
encodeBase64('你好') // '5L2g5aW9'
encodeBase64('{"name":"John"}') // 'eyJuYW1lIjoiSm9obiJ9'
```

## Related

- [decodeBase64](/api/string/decode-base64) - Decode Base64 string
