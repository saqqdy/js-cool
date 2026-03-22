# base64ToFile

Convert Base64 string to File.

## Usage

```js
import { base64ToFile } from 'js-cool'
```

## Signature

```typescript
function base64ToFile(base64: string, filename: string, mime?: string): File
```

## Parameters

| Parameter  | Type     | Description           |
| ---------- | -------- | --------------------- |
| `base64`   | `string` | Base64 encoded string |
| `filename` | `string` | Output filename       |
| `mime`     | `string` | MIME type (optional)  |

## Returns

`File` - File object.

## Examples

```js
const file = base64ToFile('SGVsbG8gV29ybGQ=', 'hello.txt', 'text/plain')

// From data URL
const imageFile = base64ToFile('data:image/png;base64,iVBOR...', 'image.png')
```

## Related

- [fileToBase64](/api/convert/file-to-base64) - File to Base64
