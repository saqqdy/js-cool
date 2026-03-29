# binary.arrayBuffer <Badge type="info" text="since v6.0.0" />

ArrayBuffer conversion sub-module.

## Usage

```js
import { binary } from 'js-cool'

const { arrayBuffer } = binary
```

## Methods

### toBase64(buffer, mime?)

Convert ArrayBuffer to Base64 string.

```typescript
function toBase64(buffer: ArrayBuffer, mime?: string): string
```

```js
const buffer = new TextEncoder().encode('Hello').buffer
const base64 = binary.arrayBuffer.toBase64(buffer)
// 'SGVsbG8='
```

### toDataURL(buffer, mime)

Convert ArrayBuffer to Data URL.

```typescript
function toDataURL(buffer: ArrayBuffer, mime: string): string
```

```js
const buffer = new TextEncoder().encode('Hello').buffer
const dataUrl = binary.arrayBuffer.toDataURL(buffer, 'text/plain')
// 'data:text/plain;base64,SGVsbG8='
```

### toBlob(buffer, mime?)

Convert ArrayBuffer to Blob.

```typescript
function toBlob(buffer: ArrayBuffer, mime?: string): Blob
```

```js
const buffer = new TextEncoder().encode('Hello').buffer
const blob = binary.arrayBuffer.toBlob(buffer, 'text/plain')
```

### toString(buffer, encoding?)

Convert ArrayBuffer to string.

```typescript
function toString(buffer: ArrayBuffer, encoding?: string): string
```

```js
const buffer = new TextEncoder().encode('Hello World').buffer
const str = binary.arrayBuffer.toString(buffer)
// 'Hello World'
```

### toHex(buffer)

Convert ArrayBuffer to hex string.

```typescript
function toHex(buffer: ArrayBuffer): string
```

```js
const buffer = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f]).buffer
const hex = binary.arrayBuffer.toHex(buffer)
// '48656c6c6f'
```

## Examples

### Binary Data Processing

```js
// Create ArrayBuffer from string
const buffer = new TextEncoder().encode('Hello World').buffer

// Convert to various formats
const base64 = binary.arrayBuffer.toBase64(buffer)
const dataUrl = binary.arrayBuffer.toDataURL(buffer, 'text/plain')
const blob = binary.arrayBuffer.toBlob(buffer, 'text/plain')
const hex = binary.arrayBuffer.toHex(buffer)
const str = binary.arrayBuffer.toString(buffer)
```

### Network Request Processing

```js
const response = await fetch('/api/data')
const buffer = await response.arrayBuffer()

// Convert to string
const text = binary.arrayBuffer.toString(buffer)

// Or convert to Base64
const base64 = binary.arrayBuffer.toBase64(buffer)
```

### File Reading

```js
const input = document.querySelector('input[type="file"]')
const file = input.files[0]

const reader = new FileReader()
reader.onload = () => {
  const buffer = reader.result
  const hex = binary.arrayBuffer.toHex(buffer)
  console.log('File hex:', hex)
}
reader.readAsArrayBuffer(file)
```

## Replaces Legacy API

```js
// Legacy API
import { arrayBufferToBase64, arrayBufferToBlob } from 'js-cool'
arrayBufferToBase64(buffer)
arrayBufferToBlob(buffer, 'text/plain')

// New API (v6.0.0)
import { binary } from 'js-cool'
binary.arrayBuffer.toBase64(buffer)
binary.arrayBuffer.toBlob(buffer, 'text/plain')
```

## Related

- [binary](/api/binary/) - Binary module overview
- [arrayBufferToBase64](/api/convert/array-buffer-to-base64) - ArrayBuffer to Base64 (legacy API)
