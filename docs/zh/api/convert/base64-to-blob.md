# base64ToBlob

将 Base64 字符串转换为 Blob。

## 用法

```js
import { base64ToBlob } from 'js-cool'
```

## 签名

```typescript
function base64ToBlob(base64: string, mime?: string): Blob
```

## 参数

| 参数     | 类型     | 描述              |
| -------- | -------- | ----------------- |
| `base64` | `string` | Base64 编码字符串 |
| `mime`   | `string` | MIME 类型（可选） |

## 返回值

`Blob` - Blob 对象。

## 示例

```js
const blob = base64ToBlob('SGVsbG8gV29ybGQ=', 'text/plain')

// 从 data URL 转换
const imageBlob = base64ToBlob('data:image/png;base64,iVBOR...')
```

## 相关

- [blobToBase64](/zh/api/convert/blob-to-base64) - Blob 转 Base64
