# arrayBufferToBlob

将 ArrayBuffer 转换为 Blob。

## 用法

```js
import { arrayBufferToBlob } from 'js-cool'
```

## 签名

```typescript
function arrayBufferToBlob(input: ArrayBuffer, mime?: string): Blob
```

## 参数

| 参数    | 类型          | 描述                           |
| ------- | ------------- | ------------------------------ |
| `input` | `ArrayBuffer` | ArrayBuffer 输入               |
| `mime`  | `string`      | MIME 类型（默认：'image/png'） |

## 返回值

`Blob` - Blob 对象。

## 示例

```js
const buffer = new ArrayBuffer(8)
const blob = arrayBufferToBlob(buffer)
// Blob { size: 8, type: 'image/png' }

const jsonBlob = arrayBufferToBlob(buffer, 'application/json')
```

## 相关

- [blobToArrayBuffer](/zh/api/convert/blob-to-array-buffer) - Blob 转 ArrayBuffer
