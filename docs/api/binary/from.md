# binary.from() <Badge type="info" text="since v6.0.0" />

Create a chainable binary converter.

## Usage

```js
import { binary } from 'js-cool'

const converter = binary.from(input, options?)
```

## Signature

```typescript
function from(input: BinaryInput, options?: BinaryFromOptions): BinaryConverter

type BinaryInput = Blob | File | ArrayBuffer | Uint8Array | string

interface BinaryFromOptions {
  mime?: string   // MIME type hint
  name?: string   // Filename hint
}
```

## Parameters

| Parameter       | Type           | Description                |
| --------------- | -------------- | -------------------------- |
| `input`         | `BinaryInput`  | Input data                 |
| `options`       | `object`       | Optional configuration     |
| `options.mime`  | `string`       | MIME type hint for conversion |
| `options.name`  | `string`       | Filename hint              |

## Returns

`BinaryConverter` - Chainable converter object.

## Converter Methods

| Method              | Returns                    | Description            |
| ------------------- | -------------------------- | ---------------------- |
| `toBase64()`        | `Promise<string>`          | Convert to Base64      |
| `toDataURL(mime?)`  | `Promise<string>`          | Convert to Data URL    |
| `toArrayBuffer()`   | `Promise<ArrayBuffer>`     | Convert to ArrayBuffer |
| `toBlob(mime?)`     | `Promise<Blob>`            | Convert to Blob        |
| `toFile(name, mime?)` | `Promise<File \| Blob>`  | Convert to File        |
| `toURL()`           | `Promise<URLResult>`       | Convert to Blob URL    |
| `getMime()`         | `string \| undefined`      | Get MIME type          |
| `getSize()`         | `number`                   | Get size in bytes      |

## Examples

### From Blob

```js
const blob = new Blob(['Hello World'], { type: 'text/plain' })

// Convert to Base64
const base64 = await binary.from(blob).toBase64()

// Convert to ArrayBuffer
const buffer = await binary.from(blob).toArrayBuffer()

// Convert to Data URL
const dataUrl = await binary.from(blob).toDataURL()

// Create Blob URL
const { url, revoke } = await binary.from(blob).toURL()
console.log(url) // 'blob:https://...'
revoke() // Release URL
```

### From File

```js
const input = document.querySelector('input[type="file"]')
const file = input.files[0]

const base64 = await binary.from(file).toBase64()
const buffer = await binary.from(file).toArrayBuffer()
const blob = await binary.from(file).toBlob()
```

### From ArrayBuffer

```js
const buffer = new TextEncoder().encode('Hello').buffer

// Need to specify MIME type
const blob = await binary.from(buffer).toBlob('text/plain')
const dataUrl = await binary.from(buffer).toDataURL('text/plain')
```

### From Base64

```js
const base64String = 'SGVsbG8gV29ybGQ='

// Specify MIME type
const blob = await binary.from(base64String, { mime: 'text/plain' }).toBlob()
const file = await binary.from(base64String, { mime: 'text/plain' }).toFile('hello.txt')
```

### From Data URL

```js
const dataUrl = 'data:image/png;base64,iVBORw0KGgo...'

const blob = await binary.from(dataUrl).toBlob()
const file = await binary.from(dataUrl).toFile('image.png')
```

### Get Metadata

```js
const file = input.files[0]
const converter = binary.from(file)

console.log(converter.getMime())  // 'image/png'
console.log(converter.getSize())  // 1024
```

## Related

- [binary](/api/binary/) - Binary module overview
- [binary.blob](/api/binary/blob) - Blob sub-module
- [binary.base64](/api/binary/base64) - Base64 sub-module
