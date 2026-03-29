# binary <Badge type="info" text="since v6.0.0" />

Unified binary data conversion API with chainable syntax, type detection, hash functions, and more.

## Usage

```js
import { binary } from 'js-cool'
```

## Overview

The `binary` module provides a unified interface for binary data conversion, supporting conversions between Blob, File, ArrayBuffer, Base64, and other formats.

### Key Features

- **Chainable Conversion** - Use `binary.from().toXxx()` for chainable conversions
- **Type Detection** - `isBlob()`, `isFile()`, `isArrayBuffer()`, `isDataURL()`, `isBase64()`
- **Sub-module APIs** - `base64`, `blob`, `arrayBuffer`, `file`, `url`, `svg`, `text`, `dataURL`, `hex`, `hash`, `meta`
- **Utility Methods** - `compare()`, `clone()`, `download()`, `parse()`
- **IE11 Compatible** - Built-in compatibility handling

## Chainable Conversion

```js
// From Blob
const blob = new Blob(['Hello World'], { type: 'text/plain' })
const base64 = await binary.from(blob).toBase64()
const arrayBuffer = await binary.from(blob).toArrayBuffer()
const url = await binary.from(blob).toURL()

// From File
const file = input.files[0]
const base64 = await binary.from(file).toBase64()
const dataUrl = await binary.from(file).toDataURL()

// From Base64
const blob = await binary.from(base64String).toBlob('image/png')
const file = await binary.from(base64String).toFile('image.png', 'image/png')

// From ArrayBuffer
const buffer = new ArrayBuffer(10)
const base64 = await binary.from(buffer).toBase64()
```

## Type Detection

```js
binary.isBlob(data) // Check if Blob
binary.isFile(data) // Check if File
binary.isArrayBuffer(data) // Check if ArrayBuffer
binary.isDataURL(str) // Check if Data URL
binary.isBase64(str) // Check if Base64 string
```

## Sub-modules

### binary.base64

Base64 encoding/decoding module.

```js
// Encode
const encoded = binary.base64.encode('Hello World')

// Decode
const decoded = binary.base64.decode(encoded)

// Conversion
const blob = binary.base64.toBlob(base64String, 'image/png')
const buffer = binary.base64.toArrayBuffer(base64String)
const dataUrl = binary.base64.toDataURL(base64String, 'image/png')
const file = binary.base64.toFile(base64String, 'image.png', 'image/png')
```

### binary.blob

Blob operations module.

```js
// Conversion
const base64 = await binary.blob.toBase64(blob)
const buffer = await binary.blob.toArrayBuffer(blob)
const dataUrl = await binary.blob.toDataURL(blob)
const file = binary.blob.toFile(blob, 'file.txt')

// Create URL
const { url, revoke } = binary.blob.toURL(blob)
// Revoke when done
revoke()

// Concatenate Blobs
const combined = binary.blob.concat([blob1, blob2], 'text/plain')

// Slice
const sliced = binary.blob.slice(blob, 0, 1024)
```

### binary.arrayBuffer

ArrayBuffer conversion module.

```js
const base64 = binary.arrayBuffer.toBase64(buffer)
const dataUrl = binary.arrayBuffer.toDataURL(buffer, 'image/png')
const blob = binary.arrayBuffer.toBlob(buffer, 'image/png')
const str = binary.arrayBuffer.toString(buffer, 'utf-8')
const hex = binary.arrayBuffer.toHex(buffer)
```

### binary.file

File conversion module.

```js
const base64 = await binary.file.toBase64(file)
const buffer = await binary.file.toArrayBuffer(file)
const blob = binary.file.toBlob(file)
```

### binary.url

URL conversion module.

```js
// Fetch Blob from URL
const blob = await binary.url.toBlob('https://example.com/image.png')

// Fetch Data URL from URL
const dataUrl = await binary.url.toDataURL('https://example.com/image.png')
```

### binary.svg

SVG conversion module.

```js
const svgString = '<svg>...</svg>'

const blob = binary.svg.toBlob(svgString)
const dataUrl = binary.svg.toDataURL(svgString)
const { url, revoke } = binary.svg.toURL(svgString)
```

### binary.text

Text encoding/decoding module.

```js
// String to ArrayBuffer and back
const buffer = binary.text.encode('Hello World')
const str = binary.text.decode(buffer)

// String to Base64 and back
const base64 = binary.text.toBase64('Hello World')
const str = binary.text.fromBase64(base64)
```

### binary.dataURL

Data URL parsing module.

```js
const dataUrl = 'data:image/png;base64,iVBORw0KGgo...'

// Parse
const { mime, base64, data } = binary.dataURL.parse(dataUrl)

// Build
const url = binary.dataURL.build(base64String, 'image/png')

// Validate
const valid = binary.dataURL.isValid(dataUrl)
```

### binary.hex

Hexadecimal encoding/decoding module.

```js
// ArrayBuffer to Hex
const hex = binary.hex.encode(buffer)

// Hex to ArrayBuffer
const buffer = binary.hex.decode(hexString)
```

### binary.hash

Hash calculation module.

```js
// Calculate hashes
const md5Hash = await binary.hash.md5(data)
const sha1Hash = await binary.hash.sha1(data)
const sha256Hash = await binary.hash.sha256(data)

// CRC32 (synchronous)
const crc = binary.hash.crc32(data)
```

### binary.meta

File metadata module.

```js
const meta = binary.meta.get(file)
// {
//   size: 1024,
//   mime: 'image/png',
//   name: 'image.png',
//   extension: 'png',
//   isImage: true,
//   isVideo: false,
//   isAudio: false,
//   isText: false
// }
```

## Utility Methods

### binary.compare()

Compare two binary inputs for content equality.

```js
const blob1 = new Blob(['Hello'])
const blob2 = new Blob(['Hello'])
const same = await binary.compare(blob1, blob2) // true
```

### binary.clone()

Clone binary data.

```js
const blob = new Blob(['Hello'])
const cloned = binary.clone(blob)
```

### binary.download()

Download binary data as file.

```js
const blob = new Blob(['Hello World'], { type: 'text/plain' })
binary.download(blob, 'hello.txt')
```

### binary.parse()

Parse binary data, return type information.

```js
const info = binary.parse(data)
// {
//   data: ...,
//   type: 'blob' | 'file' | 'arrayBuffer' | 'base64' | 'dataURL' | 'url' | 'svg',
//   mime: 'text/plain',
//   size: 1024
// }
```
