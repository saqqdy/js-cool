# getFileType <Badge type="info" text="since v5.11.0" />

Determine file type based on link suffix.

## Usage

```js
import { getFileType } from 'js-cool'
```

## Signature

```typescript
function getFileType(url: string): {
  suffix: string
  type: 'image' | 'txt' | 'excel' | 'word' | 'pdf' | 'ppt' | 'zip' | 'video' | 'audio' | 'other'
}
```

## Parameters

| Parameter | Type     | Description          |
| --------- | -------- | -------------------- |
| `url`     | `string` | File url or filename |

## Returns

`object` - Object with suffix and type properties.

| Property | Type     | Description                                                                     |
| -------- | -------- | ------------------------------------------------------------------------------- |
| `suffix` | `string` | File extension in lowercase                                                     |
| `type`   | `string` | File type category: image, txt, excel, word, pdf, ppt, zip, video, audio, other |

## Examples

```js
// Image types
getFileType('/name.png')
// { suffix: 'png', type: 'image' }

getFileType('/photo.JPG')
// { suffix: 'jpg', type: 'image' }

// Document types
getFileType('/document.PDF')
// { suffix: 'pdf', type: 'pdf' }

getFileType('/report.docx')
// { suffix: 'docx', type: 'word' }

// Media types
getFileType('/video.mp4')
// { suffix: 'mp4', type: 'video' }

getFileType('/audio.mp3')
// { suffix: 'mp3', type: 'audio' }

// Unknown type
getFileType('/file.xyz')
// { suffix: 'xyz', type: 'other' }
```

## Related

- [fileToBase64](/api/convert/file-to-base64) - Convert file to base64
