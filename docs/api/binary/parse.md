# binary.parse() <Badge type="info" text="since v6.0.0" />

Parse binary data, returning type and metadata.

## Usage

```js
import { binary } from 'js-cool'

const info = binary.parse(data)
```

## Signature

```typescript
function parse(input: BinaryInput): BinaryData

interface BinaryData {
  data: Blob | File | ArrayBuffer | string
  type: 'blob' | 'file' | 'arrayBuffer' | 'base64' | 'dataURL' | 'url' | 'svg'
  mime?: string
  name?: string
  size: number
}
```

## Parameters

| Parameter | Type          | Description    |
| --------- | ------------- | -------------- |
| `input`   | `BinaryInput` | Input data     |

## Returns

`BinaryData` - Object containing data type and metadata.

## Examples

### Parse File

```js
const file = input.files[0]
const info = binary.parse(file)

console.log(info.type) // 'file'
console.log(info.mime) // 'image/png'
console.log(info.name) // 'photo.png'
console.log(info.size) // 102400
```

### Parse Blob

```js
const blob = new Blob(['Hello'], { type: 'text/plain' })
const info = binary.parse(blob)

console.log(info.type) // 'blob'
console.log(info.mime) // 'text/plain'
console.log(info.size) // 5
```

### Parse Base64

```js
const base64 = 'SGVsbG8gV29ybGQ='
const info = binary.parse(base64)

console.log(info.type) // 'base64'
console.log(info.size) // 11 (estimated)
```

### Parse Data URL

```js
const dataUrl = 'data:image/png;base64,iVBORw0KGgo...'
const info = binary.parse(dataUrl)

console.log(info.type) // 'dataURL'
console.log(info.mime) // 'image/png'
```

### Handle by Type

```js
const data = someBinaryData
const info = binary.parse(data)

switch (info.type) {
  case 'file':
    console.log('Filename:', info.name)
    break
  case 'blob':
    console.log('Blob type:', info.mime)
    break
  case 'base64':
    console.log('Base64 data')
    break
  case 'dataURL':
    console.log('Data URL, MIME:', info.mime)
    break
}
```

## Type Detection

| Type          | Condition                       |
| ------------- | ------------------------------- |
| `file`        | `instanceof File`               |
| `blob`        | `instanceof Blob`               |
| `arrayBuffer` | `instanceof ArrayBuffer`        |
| `dataURL`     | Starts with `data:`             |
| `url`         | Starts with `http://` or `https://` |
| `base64`      | Possibly valid Base64 string    |

## Related

- [binary](/api/binary/) - Binary module overview
