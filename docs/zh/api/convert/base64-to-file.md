# base64ToFile <Badge type="info" text="v5.13.0" />

将 Base64 字符串转换为 File。

## 用法

```js
import { base64ToFile } from 'js-cool'
```

## 签名

```typescript
function base64ToFile(base64: string, filename: string, mime?: string): File
```

## 参数

| 参数       | 类型     | 描述              |
| ---------- | -------- | ----------------- |
| `base64`   | `string` | Base64 编码字符串 |
| `filename` | `string` | 输出文件名        |
| `mime`     | `string` | MIME 类型（可选） |

## 返回值

`File` - File 对象。

## 示例

```js
const file = base64ToFile('SGVsbG8gV29ybGQ=', 'hello.txt', 'text/plain')

// 从 data URL 转换
const imageFile = base64ToFile('data:image/png;base64,iVBOR...', 'image.png')
```

## 相关

- [fileToBase64](/zh/api/convert/file-to-base64) - File 转 Base64
