# base64ToArrayBuffer

Convert Base64 string to ArrayBuffer.

## Usage

```js
import { base64ToArrayBuffer } from 'js-cool'
```

## Signature

```typescript
function base64ToArrayBuffer(input: string): Uint8Array | Buffer
```

## Parameters

| Parameter | Type     | Description              |
| --------- | -------- | ------------------------ |
| `input`   | `string` | Base64 or data URL string |

## Returns

`Uint8Array | Buffer` - Uint8Array in browser, Buffer in Node.js.

## Examples

```js
const buffer = base64ToArrayBuffer('SGVsbG8gV29ybGQ=')

// With data URL
const imageBuffer = base64ToArrayBuffer('data:image/png;base64,iVBOR...')
```

## Related

- [arrayBufferToBase64](/api/convert/array-buffer-to-base64) - ArrayBuffer to Base64
