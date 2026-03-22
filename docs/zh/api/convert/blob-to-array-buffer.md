# blobToArrayBuffer <Badge type="info" text="v5.13.0" />

将 Blob 转换为 ArrayBuffer。

## 用法

```js
import { blobToArrayBuffer } from 'js-cool'
```

## 签名

```typescript
function blobToArrayBuffer(blob: Blob): Promise<ArrayBuffer>
```

## 参数

| 参数   | 类型   | 描述      |
| ------ | ------ | --------- |
| `blob` | `Blob` | Blob 输入 |

## 返回值

`Promise<ArrayBuffer>` - ArrayBuffer。

## 示例

```js
const blob = new Blob(['Hello World'])
const buffer = await blobToArrayBuffer(blob)
```

## 相关

- [arrayBufferToBlob](/zh/api/convert/array-buffer-to-blob) - ArrayBuffer 转 Blob
