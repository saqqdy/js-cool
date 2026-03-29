# binary.blob <Badge type="info" text="v6.0.0" />

Blob 操作子模块。

## 用法

```js
import { binary } from 'js-cool'

const { blob: blobApi } = binary
```

## 方法

### toBase64(blob)

将 Blob 转换为 Base64 字符串（Data URL 格式）。

```typescript
function toBase64(blob: Blob): Promise<string>
```

```js
const blob = new Blob(['Hello World'], { type: 'text/plain' })
const base64 = await binary.blob.toBase64(blob)
// 'data:text/plain;base64,SGVsbG8gV29ybGQ='
```

### toArrayBuffer(blob)

将 Blob 转换为 ArrayBuffer。

```typescript
function toArrayBuffer(blob: Blob): Promise<ArrayBuffer>
```

```js
const blob = new Blob(['Hello'])
const buffer = await binary.blob.toArrayBuffer(blob)
```

### toDataURL(blob)

将 Blob 转换为 Data URL。

```typescript
function toDataURL(blob: Blob): Promise<string>
```

```js
const blob = new Blob(['Hello'], { type: 'text/plain' })
const dataUrl = await binary.blob.toDataURL(blob)
// 'data:text/plain;base64,SGVsbG8='
```

### toFile(blob, filename)

将 Blob 转换为 File。

```typescript
function toFile(blob: Blob, filename: string): File | Blob
```

```js
const blob = new Blob(['Hello'], { type: 'text/plain' })
const file = binary.blob.toFile(blob, 'hello.txt')
```

::: tip IE11 兼容性
在 IE11 中，`toFile()` 返回 `Blob` 而非 `File`。
:::

### toURL(blob)

创建 Blob URL，返回 URL 和释放函数。

```typescript
function toURL(blob: Blob): { url: string; revoke: () => void }
```

```js
const blob = new Blob(['Hello'], { type: 'text/plain' })
const { url, revoke } = binary.blob.toURL(blob)

console.log(url) // 'blob:https://example.com/uuid'

// 使用完后释放
revoke()
```

### concat(blobs, mime?)

合并多个 Blob。

```typescript
function concat(blobs: Blob[], mime?: string): Blob
```

```js
const blob1 = new Blob(['Hello '])
const blob2 = new Blob(['World'])
const combined = binary.blob.concat([blob1, blob2], 'text/plain')
// Blob: 'Hello World'
```

### slice(blob, start, end, mime?)

切片 Blob。

```typescript
function slice(blob: Blob, start: number, end: number, mime?: string): Blob
```

```js
const blob = new Blob(['Hello World'])
const sliced = binary.blob.slice(blob, 0, 5, 'text/plain')
// Blob: 'Hello'
```

## 示例

### 文件上传预览

```js
const input = document.querySelector('input[type="file"]')
const file = input.files[0]

// 转换为 Base64 用于预览
const base64 = await binary.blob.toBase64(file)
previewImage.src = base64
```

### 合并文件片段

```js
const chunks = [chunk1, chunk2, chunk3]
const combined = binary.blob.concat(chunks, 'video/mp4')

// 下载合并后的文件
binary.download(combined, 'video.mp4')
```

### 大文件分片上传

```js
const file = input.files[0]
const chunkSize = 1024 * 1024 // 1MB
const chunks = []

for (let i = 0; i < file.size; i += chunkSize) {
  const chunk = binary.blob.slice(file, i, Math.min(i + chunkSize, file.size))
  chunks.push(chunk)
}

// 上传每个分片
for (const chunk of chunks) {
  await uploadChunk(chunk)
}
```

## 相关

- [binary](/zh/api/binary/) - Binary 模块概述
