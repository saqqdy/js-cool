# arrayBufferToBase64 <Badge type="info" text="since v5.13.0" />

Convert ArrayBuffer to Base64 string.

## Usage

```js
import { arrayBufferToBase64 } from 'js-cool'
```

## Signature

```typescript
function arrayBufferToBase64(buffer: ArrayBuffer): string
```

## Parameters

| Parameter | Type          | Description       |
| --------- | ------------- | ----------------- |
| `buffer`  | `ArrayBuffer` | ArrayBuffer input |

## Returns

`string` - Base64 encoded string.

## Examples

```js
const buffer = new ArrayBuffer(8)
const base64 = arrayBufferToBase64(buffer)
```

## Related

- [base64ToArrayBuffer](/api/convert/base64-to-array-buffer) - Base64 to ArrayBuffer
