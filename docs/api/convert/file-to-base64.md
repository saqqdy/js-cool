# fileToBase64

Convert File to Base64 string.

## Usage

```js
import { fileToBase64 } from 'js-cool'
```

## Signature

```typescript
function fileToBase64(file: File): Promise<string>
```

## Parameters

| Parameter | Type   | Description  |
| --------- | ------ | ------------ |
| `file`    | `File` | File input   |

## Returns

`Promise<string>` - Base64 encoded string (data URL).

## Examples

```js
const input = document.querySelector('input[type="file"]')
const file = input.files[0]
const base64 = await fileToBase64(file)
// 'data:image/png;base64,...'
```

## Related

- [base64ToFile](/api/convert/base64-to-file) - Base64 to File
