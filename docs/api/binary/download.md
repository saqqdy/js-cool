# binary.download() <Badge type="info" text="since v6.0.0" />

Trigger browser download of binary data.

## Usage

```js
import { binary } from 'js-cool'

binary.download(data, filename, mime?)
```

## Signature

```typescript
function download(data: Blob | File | ArrayBuffer, filename: string, mime?: string): void
```

## Parameters

| Parameter  | Type                       | Description                              |
| ---------- | -------------------------- | ---------------------------------------- |
| `data`     | `Blob \| File \| ArrayBuffer` | Data to download                      |
| `filename` | `string`                   | Download filename                        |
| `mime`     | `string`                   | MIME type (required for ArrayBuffer)     |

## Examples

### Download Blob

```js
const blob = new Blob(['Hello World'], { type: 'text/plain' })
binary.download(blob, 'hello.txt')
```

### Download File

```js
const file = input.files[0]
binary.download(file, file.name)
```

### Download ArrayBuffer

```js
const buffer = new TextEncoder().encode('Hello').buffer
binary.download(buffer, 'hello.txt', 'text/plain')
```

### Download Generated Image

```js
const canvas = document.getElementById('canvas')
canvas.toBlob(blob => {
  binary.download(blob, 'image.png')
})
```

### Download Base64 Data

```js
const base64 = 'SGVsbG8gV29ybGQ='
const blob = binary.base64.toBlob(base64, 'text/plain')
binary.download(blob, 'hello.txt')
```

### Download JSON Data

```js
const data = { name: 'John', age: 30 }
const json = JSON.stringify(data, null, 2)
const blob = new Blob([json], { type: 'application/json' })
binary.download(blob, 'data.json')
```

### Download CSV

```js
const csv = 'Name,Age\nJohn,30\nJane,25'
const blob = new Blob([csv], { type: 'text/csv' })
binary.download(blob, 'data.csv')
```

## How It Works

1. Creates a Blob URL
2. Creates a hidden `<a>` element
3. Triggers click to download
4. Cleans up URL and DOM element

## Related

- [binary](/api/binary/) - Binary module overview
