# binary.base64 <Badge type="info" text="since v6.0.0" />

Base64 encoding/decoding sub-module.

## Usage

```js
import { binary } from 'js-cool'

const { base64 } = binary
```

## Methods

### encode(str)

Encode a string to Base64.

```typescript
function encode(str: string): string
```

```js
binary.base64.encode('Hello World') // 'SGVsbG8gV29ybGQ='
binary.base64.encode('你好') // '5L2g5aW9'
```

### decode(base64)

Decode Base64 to string.

```typescript
function decode(base64: string): string
```

```js
binary.base64.decode('SGVsbG8gV29ybGQ=') // 'Hello World'
binary.base64.decode('5L2g5aW9') // '你好'
```

### toBlob(base64, mime?)

Convert Base64 to Blob.

```typescript
function toBlob(base64: string, mime?: string): Blob
```

```js
const blob = binary.base64.toBlob('iVBORw0KGgo...', 'image/png')
```

### toArrayBuffer(base64)

Convert Base64 to ArrayBuffer.

```typescript
function toArrayBuffer(base64: string): ArrayBuffer
```

```js
const buffer = binary.base64.toArrayBuffer('SGVsbG8gV29ybGQ=')
```

### toDataURL(base64, mime)

Convert Base64 to Data URL.

```typescript
function toDataURL(base64: string, mime: string): string
```

```js
const dataUrl = binary.base64.toDataURL('iVBORw0KGgo...', 'image/png')
// 'data:image/png;base64,iVBORw0KGgo...'
```

### toFile(base64, filename, mime?)

Convert Base64 to File.

```typescript
function toFile(base64: string, filename: string, mime?: string): File | Blob
```

```js
const file = binary.base64.toFile('iVBORw0KGgo...', 'image.png', 'image/png')
```

::: tip IE11 Compatibility
In IE11, `toFile()` returns `Blob` instead of `File`.
:::

## Examples

### Basic Encoding/Decoding

```js
// Encode
const encoded = binary.base64.encode('Hello World')
console.log(encoded) // 'SGVsbG8gV29ybGQ='

// Decode
const decoded = binary.base64.decode(encoded)
console.log(decoded) // 'Hello World'
```

### Image Base64 Conversion

```js
// Create image Blob from Base64
const base64Data = 'iVBORw0KGgoAAAANSUhEUgAAAAEA...'
const blob = binary.base64.toBlob(base64Data, 'image/png')

// Create image URL
const url = URL.createObjectURL(blob)
img.src = url
```

### Save Base64 as File

```js
const base64Data = 'SGVsbG8gV29ybGQ='
const file = binary.base64.toFile(base64Data, 'hello.txt', 'text/plain')

// Trigger download
binary.download(file, 'hello.txt')
```

## Replaces Legacy API

```js
// Legacy API
import { encodeBase64, decodeBase64 } from 'js-cool'
encodeBase64('Hello')
decodeBase64('SGVsbG8=')

// New API (v6.0.0)
import { binary } from 'js-cool'
binary.base64.encode('Hello')
binary.base64.decode('SGVsbG8=')
```

## Related

- [binary](/api/binary/) - Binary module overview
- [encodeBase64](/api/string/encode-base64) - String Base64 encoding (legacy API)
- [decodeBase64](/api/string/decode-base64) - String Base64 decoding (legacy API)
