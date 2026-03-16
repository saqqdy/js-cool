# blobToArrayBuffer

Convert Blob to ArrayBuffer.

## Usage

```js
import { blobToArrayBuffer } from 'js-cool'
```

## Signature

```typescript
function blobToArrayBuffer(blob: Blob): Promise<ArrayBuffer>
```

## Parameters

| Parameter | Type   | Description  |
| --------- | ------ | ------------ |
| `blob`    | `Blob` | Blob input   |

## Returns

`Promise<ArrayBuffer>` - ArrayBuffer.

## Examples

```js
const blob = new Blob(['Hello World'])
const buffer = await blobToArrayBuffer(blob)
```

## Related

- [arrayBufferToBlob](/api/convert/array-buffer-to-blob) - ArrayBuffer to Blob
