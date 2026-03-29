# binary.dataURL <Badge type="info" text="since v6.0.0" />

Data URL parsing sub-module.

## Usage

```js
import { binary } from 'js-cool'

const { dataURL } = binary
```

## Methods

### parse(dataURL)

Parse Data URL into components.

```typescript
function parse(dataURL: string): {
  mime: string
  base64: string
  data: ArrayBuffer
}
```

```js
const dataUrl =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='

const { mime, base64, data } = binary.dataURL.parse(dataUrl)
console.log(mime) // 'image/png'
console.log(base64) // 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
console.log(data) // ArrayBuffer
```

### build(base64, mime)

Build Data URL from Base64 and MIME type.

```typescript
function build(base64: string, mime: string): string
```

```js
const base64 =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
const dataUrl = binary.dataURL.build(base64, 'image/png')
console.log(dataUrl) // 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
```

### isValid(str)

Check if string is a valid Data URL.

```typescript
function isValid(str: string): boolean
```

```js
binary.dataURL.isValid('data:image/png;base64,iVBORw0KGgo...')
// true

binary.dataURL.isValid('https://example.com/image.png')
// false
```

## Examples

### Parse Pasted Data URL

```js
input.addEventListener('paste', async e => {
  const text = e.clipboardData.getData('text')

  if (binary.dataURL.isValid(text)) {
    const { mime, data } = binary.dataURL.parse(text)

    if (mime.startsWith('image/')) {
      const blob = new Blob([data], { type: mime })
      const url = URL.createObjectURL(blob)
      previewImage.src = url
    }
  }
})
```

### Build Data URL from Base64

```js
const base64String = 'SGVsbG8gV29ybGQ='
const dataUrl = binary.dataURL.build(base64String, 'text/plain')
console.log(dataUrl) // 'data:text/plain;base64,SGVsbG8gV29ybGQ='
```

### Extract Base64 Data

```js
const dataUrl = 'data:image/png;base64,iVBORw0KGgo...'
const { mime, base64 } = binary.dataURL.parse(dataUrl)

// Store Base64 (without prefix)
localStorage.setItem('imageBase64', base64)

// Rebuild
const rebuilt = binary.dataURL.build(base64, mime)
```

## Data URL Format

```
data:[<mediatype>][;base64],<data>
```

Examples:

- `data:text/plain;base64,SGVsbG8=`
- `data:image/png;base64,iVBORw0KGgo...`
- `data:text/html,<h1>Hello</h1>`

## Related

- [binary](/api/binary/) - Binary module overview
