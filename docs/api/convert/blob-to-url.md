# blobToUrl

Convert Blob to object URL.

## Usage

```js
import { blobToUrl } from 'js-cool'
```

## Signature

```typescript
function blobToUrl(blob: Blob): Promise<string>
```

## Parameters

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| `blob`    | `Blob` | Blob input  |

## Returns

`Promise<string>` - Object URL string.

## Examples

```js
const blob = new Blob(['Hello'], { type: 'text/plain' })
const url = await blobToUrl(blob)
// 'blob:http://example.com/uuid'

// Use in img tag
const imageBlob = await fetch(imageUrl).then(r => r.blob())
const objectUrl = await blobToUrl(imageBlob)
img.src = objectUrl
```

## Related

- [urlToBlob](/api/convert/url-to-blob) - URL to Blob
