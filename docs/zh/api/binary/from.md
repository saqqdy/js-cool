# binary.from() <Badge type="info" text="v6.0.0" />

创建一个可链式调用的二进制转换器。

## 用法

```js
import { binary } from 'js-cool'

const converter = binary.from(input, options?)
```

## 签名

```typescript
function from(input: BinaryInput, options?: BinaryFromOptions): BinaryConverter

type BinaryInput = Blob | File | ArrayBuffer | Uint8Array | string

interface BinaryFromOptions {
  mime?: string   // MIME 类型提示
  name?: string   // 文件名提示
}
```

## 参数

| 参数       | 类型           | 描述                         |
| ---------- | -------------- | ---------------------------- |
| `input`    | `BinaryInput`  | 输入数据                     |
| `options`  | `object`       | 可选配置                     |
| `options.mime` | `string`   | MIME 类型提示（用于转换）    |
| `options.name` | `string`   | 文件名提示                   |

## 返回值

`BinaryConverter` - 可链式调用的转换器对象。

## 转换器方法

| 方法              | 返回值                    | 描述                   |
| ----------------- | ------------------------- | ---------------------- |
| `toBase64()`      | `Promise<string>`         | 转换为 Base64 字符串   |
| `toDataURL(mime?)`| `Promise<string>`         | 转换为 Data URL        |
| `toArrayBuffer()` | `Promise<ArrayBuffer>`    | 转换为 ArrayBuffer     |
| `toBlob(mime?)`   | `Promise<Blob>`           | 转换为 Blob            |
| `toFile(name, mime?)` | `Promise<File \| Blob>` | 转换为 File          |
| `toURL()`         | `Promise<URLResult>`      | 转换为 Blob URL        |
| `getMime()`       | `string \| undefined`     | 获取 MIME 类型         |
| `getSize()`       | `number`                  | 获取数据大小（字节）   |

## 示例

### 从 Blob 转换

```js
const blob = new Blob(['Hello World'], { type: 'text/plain' })

// 转换为 Base64
const base64 = await binary.from(blob).toBase64()

// 转换为 ArrayBuffer
const buffer = await binary.from(blob).toArrayBuffer()

// 转换为 Data URL
const dataUrl = await binary.from(blob).toDataURL()

// 创建 Blob URL
const { url, revoke } = await binary.from(blob).toURL()
console.log(url) // 'blob:https://...'
revoke() // 释放 URL
```

### 从 File 转换

```js
const input = document.querySelector('input[type="file"]')
const file = input.files[0]

const base64 = await binary.from(file).toBase64()
const buffer = await binary.from(file).toArrayBuffer()
const blob = await binary.from(file).toBlob()
```

### 从 ArrayBuffer 转换

```js
const buffer = new TextEncoder().encode('Hello').buffer

// 需要指定 MIME 类型
const blob = await binary.from(buffer).toBlob('text/plain')
const dataUrl = await binary.from(buffer).toDataURL('text/plain')
```

### 从 Base64 转换

```js
const base64String = 'SGVsbG8gV29ybGQ='

// 指定 MIME 类型
const blob = await binary.from(base64String, { mime: 'text/plain' }).toBlob()
const file = await binary.from(base64String, { mime: 'text/plain' }).toFile('hello.txt')
```

### 从 Data URL 转换

```js
const dataUrl = 'data:image/png;base64,iVBORw0KGgo...'

const blob = await binary.from(dataUrl).toBlob()
const file = await binary.from(dataUrl).toFile('image.png')
```

### 获取元信息

```js
const file = input.files[0]
const converter = binary.from(file)

console.log(converter.getMime())  // 'image/png'
console.log(converter.getSize())  // 1024
```

## 相关

- [binary](/zh/api/binary/) - Binary 模块概述
- [binary.blob](/zh/api/binary/blob) - Blob 子模块
- [binary.base64](/zh/api/binary/base64) - Base64 子模块
