# arrayBufferToBlob

Convert ArrayBuffer to Blob.

## Usage

```js
import { arrayBufferToBlob } from 'js-cool'
```

## Signature

```typescript
function arrayBufferToBlob(input: ArrayBuffer, mime?: string): Blob
```

## Parameters

| Parameter | Type          | Description                  |
| --------- | ------------- | ---------------------------- |
| `input`   | `ArrayBuffer` | ArrayBuffer input            |
| `mime`    | `string`      | MIME type (default: 'image/png') |

## Returns

`Blob` - Blob object.

## Examples

```js
const buffer = new ArrayBuffer(8)
const blob = arrayBufferToBlob(buffer)
// Blob { size: 8, type: 'image/png' }

const jsonBlob = arrayBufferToBlob(buffer, 'application/json')
```

## Related

- [blobToArrayBuffer](/api/convert/blob-to-array-buffer) - Blob to ArrayBuffer
