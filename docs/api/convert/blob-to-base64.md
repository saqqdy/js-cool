# blobToBase64

Convert Blob to Base64 string.

## Usage

```js
import { blobToBase64 } from 'js-cool'
```

## Signature

```typescript
function blobToBase64(blob: Blob): Promise<string>
```

## Parameters

| Parameter | Type   | Description  |
| --------- | ------ | ------------ |
| `blob`    | `Blob` | Blob input   |

## Returns

`Promise<string>` - Base64 encoded string.

## Examples

```js
const blob = new Blob(['Hello World'])
const base64 = await blobToBase64(blob)
```

## Related

- [base64ToBlob](/api/convert/base64-to-blob) - Base64 to Blob
