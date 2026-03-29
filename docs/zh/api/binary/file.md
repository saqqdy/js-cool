# binary.file <Badge type="info" text="v6.0.0" />

File 转换子模块。

## 用法

```js
import { binary } from 'js-cool'

const { file: fileApi } = binary
```

## 方法

### toBase64(file)

将 File 转换为 Base64 字符串（Data URL 格式）。

```typescript
function toBase64(file: File): Promise<string>
```

```js
const input = document.querySelector('input[type="file"]')
const file = input.files[0]
const base64 = await binary.file.toBase64(file)
// 'data:image/png;base64,iVBORw0KGgo...'
```

### toArrayBuffer(file)

将 File 转换为 ArrayBuffer。

```typescript
function toArrayBuffer(file: File): Promise<ArrayBuffer>
```

```js
const file = input.files[0]
const buffer = await binary.file.toArrayBuffer(file)
```

### toBlob(file)

将 File 转换为 Blob。

```typescript
function toBlob(file: File): Blob
```

```js
const file = input.files[0]
const blob = binary.file.toBlob(file)
```

## 示例

### 图片预览

```js
const input = document.querySelector('input[type="file"]')
input.addEventListener('change', async () => {
  const file = input.files[0]

  if (file.type.startsWith('image/')) {
    const base64 = await binary.file.toBase64(file)
    document.getElementById('preview').src = base64
  }
})
```

### 文件内容读取

```js
const file = input.files[0]

// 读取为文本
const buffer = await binary.file.toArrayBuffer(file)
const text = binary.arrayBuffer.toString(buffer)

console.log('File content:', text)
```

### 文件转换

```js
const file = input.files[0]

// File 转 Blob（移除文件名信息）
const blob = binary.file.toBlob(file)

// 重新创建 File（修改文件名）
const newFile = binary.blob.toFile(blob, 'new-name.txt')
```

## 替代旧 API

```js
// 旧 API
import { fileToBase64 } from 'js-cool'
await fileToBase64(file)

// 新 API (v6.0.0)
import { binary } from 'js-cool'
await binary.file.toBase64(file)
```

## 相关

- [binary](/zh/api/binary/) - Binary 模块概述
- [fileToBase64](/zh/api/convert/file-to-base64) - File 转 Base64（旧 API）
