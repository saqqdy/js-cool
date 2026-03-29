# binary.text <Badge type="info" text="since v6.0.0" />

Text encoding/decoding sub-module for converting between strings and binary data.

## Usage

```js
import { binary } from 'js-cool'

const { text } = binary
```

## Methods

### encode(str, encoding?)

Encode string to ArrayBuffer.

```typescript
function encode(str: string, encoding?: string): ArrayBuffer
```

```js
const buffer = binary.text.encode('Hello World')
console.log(buffer.byteLength) // 11
```

### decode(buffer, encoding?)

Decode ArrayBuffer to string.

```typescript
function decode(buffer: ArrayBuffer, encoding?: string): string
```

```js
const buffer = binary.text.encode('Hello World')
const str = binary.text.decode(buffer)
console.log(str) // 'Hello World'
```

### toBase64(str)

Convert string to Base64.

```typescript
function toBase64(str: string): string
```

```js
const base64 = binary.text.toBase64('Hello World')
console.log(base64) // 'SGVsbG8gV29ybGQ='
```

### fromBase64(base64)

Convert Base64 to string.

```typescript
function fromBase64(base64: string): string
```

```js
const str = binary.text.fromBase64('SGVsbG8gV29ybGQ=')
console.log(str) // 'Hello World'
```

## Examples

### String to ArrayBuffer and Back

```js
const str = 'Hello 世界'

// Encode
const buffer = binary.text.encode(str)

// Decode
const decoded = binary.text.decode(buffer)
console.log(decoded) // 'Hello 世界'
```

### String to Base64 and Back

```js
const str = 'Hello World'

// Encode
const base64 = binary.text.toBase64(str)
console.log(base64) // 'SGVsbG8gV29ybGQ='

// Decode
const decoded = binary.text.fromBase64(base64)
console.log(decoded) // 'Hello World'
```

### Working with Other Modules

```js
// String -> ArrayBuffer -> Blob
const str = 'Hello World'
const buffer = binary.text.encode(str)
const blob = binary.arrayBuffer.toBlob(buffer, 'text/plain')

// Download as text file
binary.download(blob, 'hello.txt')
```

## Encoding Notes

- Default encoding is UTF-8
- Supports Chinese, emojis, and other Unicode characters
- `encoding` parameter is optional for specifying other encodings (e.g., 'gbk')

## Related

- [binary](/api/binary/) - Binary module overview
- [binary.base64](/api/binary/base64) - Base64 sub-module
