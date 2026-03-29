# binary.url <Badge type="info" text="since v6.0.0" />

URL conversion sub-module for fetching binary data from network URLs.

## Usage

```js
import { binary } from 'js-cool'

const { url: urlApi } = binary
```

## Methods

### toBlob(url)

Fetch Blob from URL.

```typescript
function toBlob(url: string): Promise<Blob>
```

```js
const blob = await binary.url.toBlob('https://example.com/image.png')
console.log(blob.type) // 'image/png'
```

### toDataURL(url)

Fetch Data URL from URL.

```typescript
function toDataURL(url: string): Promise<string>
```

```js
const dataUrl = await binary.url.toDataURL('https://example.com/image.png')
// 'data:image/png;base64,iVBORw0KGgo...'
```

## Examples

### Download Remote Image

```js
const imageUrl = 'https://example.com/photo.jpg'
const blob = await binary.url.toBlob(imageUrl)

// Create local preview
const previewUrl = URL.createObjectURL(blob)
document.getElementById('preview').src = previewUrl
```

### Image to Base64

```js
const imageUrl = 'https://example.com/icon.png'
const dataUrl = await binary.url.toDataURL(imageUrl)

// Store Base64 locally
localStorage.setItem('icon', dataUrl)
```

### Batch Download

```js
const urls = [
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg',
  'https://example.com/image3.jpg'
]

const blobs = await Promise.all(
  urls.map(url => binary.url.toBlob(url))
)

// Download each
blobs.forEach((blob, index) => {
  binary.download(blob, `image${index + 1}.jpg`)
})
```

### CORS Handling

```js
// If resource supports CORS, can use directly
try {
  const blob = await binary.url.toBlob('https://other-domain.com/image.png')
} catch (error) {
  console.error('Cross-origin request failed:', error)
}
```

::: warning CORS Restrictions
Due to browser security policies, cross-origin requests require the server to configure CORS headers. If the server doesn't support CORS, the request will fail.
:::

## Related

- [binary](/api/binary/) - Binary module overview
