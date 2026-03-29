# binary.blob <Badge type="info" text="since v6.0.0" />

Blob operations sub-module.

## Usage

```js
import { binary } from 'js-cool'

const { blob: blobApi } = binary
```

## Methods

### toBase64(blob)

Convert Blob to Base64 string (Data URL format).

```typescript
function toBase64(blob: Blob): Promise<string>
```

```js
const blob = new Blob(['Hello World'], { type: 'text/plain' })
const base64 = await binary.blob.toBase64(blob)
// 'data:text/plain;base64,SGVsbG8gV29ybGQ='
```

### toArrayBuffer(blob)

Convert Blob to ArrayBuffer.

```typescript
function toArrayBuffer(blob: Blob): Promise<ArrayBuffer>
```

```js
const blob = new Blob(['Hello'])
const buffer = await binary.blob.toArrayBuffer(blob)
```

### toDataURL(blob)

Convert Blob to Data URL.

```typescript
function toDataURL(blob: Blob): Promise<string>
```

```js
const blob = new Blob(['Hello'], { type: 'text/plain' })
const dataUrl = await binary.blob.toDataURL(blob)
// 'data:text/plain;base64,SGVsbG8='
```

### toFile(blob, filename)

Convert Blob to File.

```typescript
function toFile(blob: Blob, filename: string): File | Blob
```

```js
const blob = new Blob(['Hello'], { type: 'text/plain' })
const file = binary.blob.toFile(blob, 'hello.txt')
```

::: tip IE11 Compatibility
In IE11, `toFile()` returns `Blob` instead of `File`.
:::

### toURL(blob)

Create Blob URL, returns URL and revoke function.

```typescript
function toURL(blob: Blob): { url: string; revoke: () => void }
```

```js
const blob = new Blob(['Hello'], { type: 'text/plain' })
const { url, revoke } = binary.blob.toURL(blob)

console.log(url) // 'blob:https://example.com/uuid'

// Revoke when done
revoke()
```

### concat(blobs, mime?)

Concatenate multiple Blobs.

```typescript
function concat(blobs: Blob[], mime?: string): Blob
```

```js
const blob1 = new Blob(['Hello '])
const blob2 = new Blob(['World'])
const combined = binary.blob.concat([blob1, blob2], 'text/plain')
// Blob: 'Hello World'
```

### slice(blob, start, end, mime?)

Slice a Blob.

```typescript
function slice(blob: Blob, start: number, end: number, mime?: string): Blob
```

```js
const blob = new Blob(['Hello World'])
const sliced = binary.blob.slice(blob, 0, 5, 'text/plain')
// Blob: 'Hello'
```

## Examples

### File Upload Preview

```js
const input = document.querySelector('input[type="file"]')
const file = input.files[0]

// Convert to Base64 for preview
const base64 = await binary.blob.toBase64(file)
previewImage.src = base64
```

### Merge File Chunks

```js
const chunks = [chunk1, chunk2, chunk3]
const combined = binary.blob.concat(chunks, 'video/mp4')

// Download merged file
binary.download(combined, 'video.mp4')
```

### Large File Chunked Upload

```js
const file = input.files[0]
const chunkSize = 1024 * 1024 // 1MB
const chunks = []

for (let i = 0; i < file.size; i += chunkSize) {
  const chunk = binary.blob.slice(file, i, Math.min(i + chunkSize, file.size))
  chunks.push(chunk)
}

// Upload each chunk
for (const chunk of chunks) {
  await uploadChunk(chunk)
}
```

## Related

- [binary](/api/binary/) - Binary module overview
