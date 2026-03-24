# download <Badge type="info" text="since v1.1.0" />

File download utilities with multiple download methods.

## Usage

```js
import { download } from 'js-cool'
```

## Signature

```typescript
function download(url: string, filename?: string, type?: DownloadType): void

type DownloadType = 'href' | 'open' | 'download' | 'request'
```

## Parameters

| Parameter  | Type           | Description                                                    |
| ---------- | -------------- | -------------------------------------------------------------- |
| `url`      | `string`       | File URL to download                                           |
| `filename` | `string`       | Optional filename (extracted from URL if not provided)         |
| `type`     | `DownloadType` | Download method: `'href'`, `'open'`, `'download'`, `'request'` |

## Download Types

| Type         | Description                                             |
| ------------ | ------------------------------------------------------- |
| `'download'` | Use anchor element with download attribute (default)    |
| `'href'`     | Navigate directly to URL (`window.location.href = url`) |
| `'open'`     | Open in new tab (`window.open(url)`)                    |
| `'request'`  | Use XMLHttpRequest (for authenticated downloads)        |

## Returns

`void`

## Examples

### Basic Download

```js
// Download file with anchor element (default)
download('https://example.com/file.pdf', 'document.pdf')

// Filename is extracted from URL if not provided
download('https://example.com/report.pdf')
```

### Different Download Methods

```js
// Open in new tab
download('https://example.com/file.pdf', 'document.pdf', 'open')

// Navigate directly (useful for file formats browser doesn't recognize)
download('https://example.com/file.pdf', 'document.pdf', 'href')

// Use XHR for authenticated downloads
download('https://api.example.com/download', 'data.json', 'request')
```

## Related Functions

### saveFile

Save data directly as a file.

```typescript
function saveFile(data: Blob | ArrayBuffer | string, filename: string, mimeType?: string): void
```

```js
import { saveFile } from 'js-cool'

// Save text
saveFile('Hello World', 'hello.txt')

// Save JSON
saveFile(JSON.stringify(data, null, 2), 'data.json', 'application/json')

// Save Blob
const blob = new Blob(['content'], { type: 'text/plain' })
saveFile(blob, 'file.txt')
```

### downloadFile

Download file using anchor element.

```typescript
function downloadFile(url: string, filename: string): void
```

```js
import { downloadFile } from 'js-cool'

downloadFile('https://example.com/file.pdf', 'document.pdf')
```

### downloadUrlFile

Download file via XMLHttpRequest (for authenticated downloads).

```typescript
function downloadUrlFile(url: string, filename: string): void
```

```js
import { downloadUrlFile } from 'js-cool'

downloadUrlFile('https://example.com/file.pdf', 'document.pdf')
```

## Notes

- Only works in browser environment
- `'request'` type is useful when you need to include authentication headers
- `saveFile` automatically creates a Blob URL and triggers download
- For large files, consider using `'request'` type to show progress
