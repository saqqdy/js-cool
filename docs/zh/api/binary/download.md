# binary.download() <Badge type="info" text="v6.0.0" />

触发浏览器下载二进制数据。

## 用法

```js
import { binary } from 'js-cool'

binary.download(data, filename, mime?)
```

## 签名

```typescript
function download(data: Blob | File | ArrayBuffer, filename: string, mime?: string): void
```

## 参数

| 参数       | 类型                       | 描述                       |
| ---------- | -------------------------- | -------------------------- |
| `data`     | `Blob \| File \| ArrayBuffer` | 要下载的数据             |
| `filename` | `string`                   | 下载的文件名               |
| `mime`     | `string`                   | MIME 类型（ArrayBuffer 时必需） |

## 示例

### 下载 Blob

```js
const blob = new Blob(['Hello World'], { type: 'text/plain' })
binary.download(blob, 'hello.txt')
```

### 下载 File

```js
const file = input.files[0]
binary.download(file, file.name)
```

### 下载 ArrayBuffer

```js
const buffer = new TextEncoder().encode('Hello').buffer
binary.download(buffer, 'hello.txt', 'text/plain')
```

### 下载生成的图片

```js
const canvas = document.getElementById('canvas')
canvas.toBlob(blob => {
  binary.download(blob, 'image.png')
})
```

### 下载 Base64 数据

```js
const base64 = 'SGVsbG8gV29ybGQ='
const blob = binary.base64.toBlob(base64, 'text/plain')
binary.download(blob, 'hello.txt')
```

### 下载 JSON 数据

```js
const data = { name: 'John', age: 30 }
const json = JSON.stringify(data, null, 2)
const blob = new Blob([json], { type: 'application/json' })
binary.download(blob, 'data.json')
```

### 下载 CSV

```js
const csv = 'Name,Age\nJohn,30\nJane,25'
const blob = new Blob([csv], { type: 'text/csv' })
binary.download(blob, 'data.csv')
```

## 工作原理

1. 创建 Blob URL
2. 创建隐藏的 `<a>` 元素
3. 触发点击下载
4. 清理 URL 和 DOM 元素

## 相关

- [binary](/zh/api/binary/) - Binary 模块概述
