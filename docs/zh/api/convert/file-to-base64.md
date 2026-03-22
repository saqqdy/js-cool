# fileToBase64 <Badge type="info" text="v5.13.0" />

将 File 转换为 Base64 字符串。

## 用法

```js
import { fileToBase64 } from 'js-cool'
```

## 签名

```typescript
function fileToBase64(file: File): Promise<string>
```

## 参数

| 参数   | 类型   | 描述      |
| ------ | ------ | --------- |
| `file` | `File` | File 输入 |

## 返回值

`Promise<string>` - Base64 编码字符串（data URL）。

## 示例

```js
const input = document.querySelector('input[type="file"]')
const file = input.files[0]
const base64 = await fileToBase64(file)
// 'data:image/png;base64,...'
```

## 相关

- [base64ToFile](/zh/api/convert/base64-to-file) - Base64 转 File
