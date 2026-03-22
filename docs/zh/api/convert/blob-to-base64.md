# blobToBase64 <Badge type="info" text="v5.13.0" />

将 Blob 转换为 Base64 字符串。

## 用法

```js
import { blobToBase64 } from 'js-cool'
```

## 签名

```typescript
function blobToBase64(blob: Blob): Promise<string>
```

## 参数

| 参数   | 类型   | 描述      |
| ------ | ------ | --------- |
| `blob` | `Blob` | Blob 输入 |

## 返回值

`Promise<string>` - Base64 编码字符串。

## 示例

```js
const blob = new Blob(['Hello World'])
const base64 = await blobToBase64(blob)
```

## 相关

- [base64ToBlob](/zh/api/convert/base64-to-blob) - Base64 转 Blob
