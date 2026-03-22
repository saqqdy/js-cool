# decodeBase64 <Badge type="info" text="since v1.0.1" />

Decode a Base64 encoded string.

## Usage

```js
import { decodeBase64 } from 'js-cool'
```

## Signature

```typescript
function decodeBase64(input: string): string
```

## Parameters

| Parameter | Type     | Description                 |
| --------- | -------- | --------------------------- |
| `input`   | `string` | The Base64 string to decode |

## Returns

`string` - The decoded string.

## Examples

```js
decodeBase64('SGVsbG8gV29ybGQ=') // 'Hello World'
decodeBase64('5L2g5aW9') // '你好'
```

## Related

- [encodeBase64](/api/string/encode-base64) - Encode string to Base64
