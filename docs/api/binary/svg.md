# binary.svg <Badge type="info" text="since v6.0.0" />

SVG conversion sub-module for converting SVG strings to various formats.

## Usage

```js
import { binary } from 'js-cool'

const { svg } = binary
```

## Methods

### toBlob(svg)

Convert SVG string to Blob.

```typescript
function toBlob(svg: string): Blob
```

```js
const svgString = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="red"/></svg>'

const blob = binary.svg.toBlob(svgString)
// Blob { type: 'image/svg+xml', size: ... }
```

### toDataURL(svg)

Convert SVG string to Data URL.

```typescript
function toDataURL(svg: string): string
```

```js
const svgString = '<svg>...</svg>'
const dataUrl = binary.svg.toDataURL(svgString)
// 'data:image/svg+xml;base64,...'
```

### toURL(svg)

Convert SVG string to Blob URL.

```typescript
function toURL(svg: string): { url: string; revoke: () => void }
```

```js
const svgString = '<svg>...</svg>'
const { url, revoke } = binary.svg.toURL(svgString)

// Use in img tag
img.src = url

// Revoke when done
revoke()
```

## Examples

### Dynamic SVG Image Creation

```js
const svgString = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="40" fill="blue"/>
  </svg>
`

const { url, revoke } = binary.svg.toURL(svgString)
document.getElementById('preview').src = url
```

### SVG to PNG (with Canvas)

```js
const svgString = '<svg>...</svg>'
const { url, revoke } = binary.svg.toURL(svgString)

const img = new Image()
img.onload = () => {
  const canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height

  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0)

  // Convert to PNG
  canvas.toBlob(blob => {
    binary.download(blob, 'image.png')
    revoke() // Release URL
  })
}
img.src = url
```

### SVG Download

```js
const svgString = '<svg>...</svg>'
const blob = binary.svg.toBlob(svgString)
binary.download(blob, 'image.svg')
```

## Replaces Legacy API

```js
// Legacy API
import { svgToBlob } from 'js-cool'
svgToBlob(svgString)

// New API (v6.0.0)
import { binary } from 'js-cool'
binary.svg.toBlob(svgString)
```

## Related

- [binary](/api/binary/) - Binary module overview
