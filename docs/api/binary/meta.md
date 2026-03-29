# binary.meta <Badge type="info" text="since v6.0.0" />

File metadata sub-module for getting file information.

## Usage

```js
import { binary } from 'js-cool'

const { meta } = binary
```

## Methods

### get(data)

Get metadata of a File or Blob.

```typescript
function get(data: Blob | File): BinaryMeta

interface BinaryMeta {
  size: number        // Size in bytes
  mime: string        // MIME type
  name?: string       // Filename (File only)
  lastModified?: number // Last modified timestamp (File only)
  extension?: string  // File extension
  isImage: boolean    // Is image
  isVideo: boolean    // Is video
  isAudio: boolean    // Is audio
  isText: boolean     // Is text
}
```

## Examples

### Get File Information

```js
const input = document.querySelector('input[type="file"]')
const file = input.files[0]

const info = binary.meta.get(file)
console.log(info)
// {
//   size: 102400,
//   mime: 'image/png',
//   name: 'photo.png',
//   lastModified: 1711234567890,
//   extension: 'png',
//   isImage: true,
//   isVideo: false,
//   isAudio: false,
//   isText: false
// }
```

### File Type Detection

```js
const file = input.files[0]
const info = binary.meta.get(file)

if (info.isImage) {
  console.log('This is an image file')
} else if (info.isVideo) {
  console.log('This is a video file')
} else if (info.isAudio) {
  console.log('This is an audio file')
}
```

### File Size Check

```js
const file = input.files[0]
const info = binary.meta.get(file)

const maxSize = 10 * 1024 * 1024 // 10MB
if (info.size > maxSize) {
  alert('File size cannot exceed 10MB')
}
```

### MIME Type Check

```js
const file = input.files[0]
const info = binary.meta.get(file)

const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
if (!allowedTypes.includes(info.mime)) {
  alert('Only JPG, PNG, GIF images are supported')
}
```

### Blob Metadata

```js
const blob = new Blob(['Hello World'], { type: 'text/plain' })
const info = binary.meta.get(blob)
console.log(info)
// {
//   size: 11,
//   mime: 'text/plain',
//   extension: 'txt',
//   isImage: false,
//   isVideo: false,
//   isAudio: false,
//   isText: true
// }
// name and lastModified won't exist for Blob
```

## Type Detection

`isImage`, `isVideo`, `isAudio`, `isText` are determined by MIME type:

| Type   | MIME Prefix         |
| ------ | ------------------- |
| Image  | `image/*`           |
| Video  | `video/*`           |
| Audio  | `audio/*`           |
| Text   | `text/*`, `application/json`, `application/xml`, etc. |

## Related

- [binary](/api/binary/) - Binary module overview
