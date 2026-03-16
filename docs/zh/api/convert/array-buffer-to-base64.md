# arrayBufferToBase64

将 ArrayBuffer 转换为 Base64 字符串。

## 用法

```js
import { arrayBufferToBase64 } from 'js-cool'
```

## 签名

```typescript
function arrayBufferToBase64(buffer: ArrayBuffer): string
```

## 参数

| 参数     | 类型          | 描述             |
| -------- | ------------- | ---------------- |
| `buffer` | `ArrayBuffer` | ArrayBuffer 输入 |

## 返回值

`string` - Base64 编码字符串。

## 示例

```js
const buffer = new ArrayBuffer(8)
const base64 = arrayBufferToBase64(buffer)
```

## 相关

- [base64ToArrayBuffer](/zh/api/convert/base64-to-array-buffer) - Base64 转 ArrayBuffer
