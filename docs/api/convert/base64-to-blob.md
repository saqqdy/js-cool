# base64ToBlob <Badge type="info" text="since v5.13.0" />

Convert Base64 string to Blob.

## Usage

```js
import { base64ToBlob } from 'js-cool'
```

## Signature

```typescript
function base64ToBlob(base64: string, mime?: string): Blob
```

## Parameters

| Parameter | Type     | Description           |
| --------- | -------- | --------------------- |
| `base64`  | `string` | Base64 encoded string |
| `mime`    | `string` | MIME type (optional)  |

## Returns

`Blob` - Blob object.

## Examples

```js
const blob = base64ToBlob('SGVsbG8gV29ybGQ=', 'text/plain')

// From data URL
const imageBlob = base64ToBlob('data:image/png;base64,iVBOR...')
```

## Related

- [blobToBase64](/api/convert/blob-to-base64) - Blob to Base64
