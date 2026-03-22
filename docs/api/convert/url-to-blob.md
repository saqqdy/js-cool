# urlToBlob <Badge type="info" text="since v5.13.0" />

Convert URL to Blob.

## Usage

```js
import { urlToBlob } from 'js-cool'
```

## Signature

```typescript
function urlToBlob(url: string): Promise<Blob>
```

## Parameters

| Parameter | Type     | Description  |
| --------- | -------- | ------------ |
| `url`     | `string` | URL to fetch |

## Returns

`Promise<Blob>` - Blob object.

## Examples

```js
const blob = await urlToBlob('https://example.com/image.png')

// Use for file download
const blob = await urlToBlob(fileUrl)
const url = URL.createObjectURL(blob)
```

## Related

- [blobToUrl](/api/convert/blob-to-url) - Blob to URL
