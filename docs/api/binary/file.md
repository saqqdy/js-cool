# binary.file <Badge type="info" text="since v6.0.0" />

File conversion sub-module.

## Usage

```js
import { binary } from 'js-cool'

const { file: fileApi } = binary
```

## Methods

### toBase64(file)

Convert File to Base64 string (Data URL format).

```typescript
function toBase64(file: File): Promise<string>
```

```js
const input = document.querySelector('input[type="file"]')
const file = input.files[0]
const base64 = await binary.file.toBase64(file)
// 'data:image/png;base64,iVBORw0KGgo...'
```

### toArrayBuffer(file)

Convert File to ArrayBuffer.

```typescript
function toArrayBuffer(file: File): Promise<ArrayBuffer>
```

```js
const file = input.files[0]
const buffer = await binary.file.toArrayBuffer(file)
```

### toBlob(file)

Convert File to Blob.

```typescript
function toBlob(file: File): Blob
```

```js
const file = input.files[0]
const blob = binary.file.toBlob(file)
```

## Examples

### Image Preview

```js
const input = document.querySelector('input[type="file"]')
input.addEventListener('change', async () => {
  const file = input.files[0]

  if (file.type.startsWith('image/')) {
    const base64 = await binary.file.toBase64(file)
    document.getElementById('preview').src = base64
  }
})
```

### File Content Reading

```js
const file = input.files[0]

// Read as text
const buffer = await binary.file.toArrayBuffer(file)
const text = binary.arrayBuffer.toString(buffer)

console.log('File content:', text)
```

### File Conversion

```js
const file = input.files[0]

// File to Blob (removes filename info)
const blob = binary.file.toBlob(file)

// Re-create File (modify filename)
const newFile = binary.blob.toFile(blob, 'new-name.txt')
```

## Related

- [binary](/api/binary/) - Binary module overview
