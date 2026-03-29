# binary.base64 <Badge type="info" text="v6.0.0" />

Base64 编解码子模块。

## 用法

```js
import { binary } from 'js-cool'

const { base64 } = binary
```

## 方法

### encode(str)

将字符串编码为 Base64。

```typescript
function encode(str: string): string
```

```js
binary.base64.encode('Hello World') // 'SGVsbG8gV29ybGQ='
binary.base64.encode('你好') // '5L2g5aW9'
```

### decode(base64)

将 Base64 解码为字符串。

```typescript
function decode(base64: string): string
```

```js
binary.base64.decode('SGVsbG8gV29ybGQ=') // 'Hello World'
binary.base64.decode('5L2g5aW9') // '你好'
```

### toBlob(base64, mime?)

将 Base64 转换为 Blob。

```typescript
function toBlob(base64: string, mime?: string): Blob
```

```js
const blob = binary.base64.toBlob('iVBORw0KGgo...', 'image/png')
```

### toArrayBuffer(base64)

将 Base64 转换为 ArrayBuffer。

```typescript
function toArrayBuffer(base64: string): ArrayBuffer
```

```js
const buffer = binary.base64.toArrayBuffer('SGVsbG8gV29ybGQ=')
```

### toDataURL(base64, mime)

将 Base64 转换为 Data URL。

```typescript
function toDataURL(base64: string, mime: string): string
```

```js
const dataUrl = binary.base64.toDataURL('iVBORw0KGgo...', 'image/png')
// 'data:image/png;base64,iVBORw0KGgo...'
```

### toFile(base64, filename, mime?)

将 Base64 转换为 File。

```typescript
function toFile(base64: string, filename: string, mime?: string): File | Blob
```

```js
const file = binary.base64.toFile('iVBORw0KGgo...', 'image.png', 'image/png')
```

::: tip IE11 兼容性
在 IE11 中，`toFile()` 返回 `Blob` 而非 `File`。
:::

## 示例

### 基本编解码

```js
// 编码
const encoded = binary.base64.encode('Hello World')
console.log(encoded) // 'SGVsbG8gV29ybGQ='

// 解码
const decoded = binary.base64.decode(encoded)
console.log(decoded) // 'Hello World'
```

### 图片 Base64 转换

```js
// 从 Base64 创建图片 Blob
const base64Data = 'iVBORw0KGgoAAAANSUhEUgAAAAEA...'
const blob = binary.base64.toBlob(base64Data, 'image/png')

// 创建图片 URL
const url = URL.createObjectURL(blob)
img.src = url
```

### 保存 Base64 为文件

```js
const base64Data = 'SGVsbG8gV29ybGQ='
const file = binary.base64.toFile(base64Data, 'hello.txt', 'text/plain')

// 触发下载
binary.download(file, 'hello.txt')
```

## 替代旧 API

```js
// 旧 API
import { encodeBase64, decodeBase64 } from 'js-cool'
encodeBase64('Hello')
decodeBase64('SGVsbG8=')

// 新 API (v6.0.0)
import { binary } from 'js-cool'
binary.base64.encode('Hello')
binary.base64.decode('SGVsbG8=')
```

## 相关

- [binary](/zh/api/binary/) - Binary 模块概述
- [encodeBase64](/zh/api/string/encode-base64) - 字符串 Base64 编码（旧 API）
- [decodeBase64](/zh/api/string/decode-base64) - 字符串 Base64 解码（旧 API）
