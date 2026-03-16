# base64ToArrayBuffer

将 Base64 字符串转换为 ArrayBuffer。

## 用法

```js
import { base64ToArrayBuffer } from 'js-cool'
```

## 签名

```typescript
function base64ToArrayBuffer(input: string): Uint8Array | Buffer
```

## 参数

| 参数    | 类型     | 描述                    |
| ------- | -------- | ----------------------- |
| `input` | `string` | Base64 或 data URL 字符串 |

## 返回值

`Uint8Array | Buffer` - 浏览器环境返回 Uint8Array，Node.js 环境返回 Buffer。

## 示例

```js
const buffer = base64ToArrayBuffer('SGVsbG8gV29ybGQ=')

// 使用 data URL
const imageBuffer = base64ToArrayBuffer('data:image/png;base64,iVBOR...')
```

## 相关

- [arrayBufferToBase64](/zh/api/convert/array-buffer-to-base64) - ArrayBuffer 转 Base64
