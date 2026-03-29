# binary.arrayBuffer <Badge type="info" text="v6.0.0" />

ArrayBuffer 转换子模块。

## 用法

```js
import { binary } from 'js-cool'

const { arrayBuffer } = binary
```

## 方法

### toBase64(buffer, mime?)

将 ArrayBuffer 转换为 Base64 字符串。

```typescript
function toBase64(buffer: ArrayBuffer, mime?: string): string
```

```js
const buffer = new TextEncoder().encode('Hello').buffer
const base64 = binary.arrayBuffer.toBase64(buffer)
// 'SGVsbG8='
```

### toDataURL(buffer, mime)

将 ArrayBuffer 转换为 Data URL。

```typescript
function toDataURL(buffer: ArrayBuffer, mime: string): string
```

```js
const buffer = new TextEncoder().encode('Hello').buffer
const dataUrl = binary.arrayBuffer.toDataURL(buffer, 'text/plain')
// 'data:text/plain;base64,SGVsbG8='
```

### toBlob(buffer, mime?)

将 ArrayBuffer 转换为 Blob。

```typescript
function toBlob(buffer: ArrayBuffer, mime?: string): Blob
```

```js
const buffer = new TextEncoder().encode('Hello').buffer
const blob = binary.arrayBuffer.toBlob(buffer, 'text/plain')
```

### toString(buffer, encoding?)

将 ArrayBuffer 转换为字符串。

```typescript
function toString(buffer: ArrayBuffer, encoding?: string): string
```

```js
const buffer = new TextEncoder().encode('Hello World').buffer
const str = binary.arrayBuffer.toString(buffer)
// 'Hello World'
```

### toHex(buffer)

将 ArrayBuffer 转换为十六进制字符串。

```typescript
function toHex(buffer: ArrayBuffer): string
```

```js
const buffer = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f]).buffer
const hex = binary.arrayBuffer.toHex(buffer)
// '48656c6c6f'
```

## 示例

### 二进制数据处理

```js
// 从字符串创建 ArrayBuffer
const buffer = new TextEncoder().encode('Hello World').buffer

// 转换为各种格式
const base64 = binary.arrayBuffer.toBase64(buffer)
const dataUrl = binary.arrayBuffer.toDataURL(buffer, 'text/plain')
const blob = binary.arrayBuffer.toBlob(buffer, 'text/plain')
const hex = binary.arrayBuffer.toHex(buffer)
const str = binary.arrayBuffer.toString(buffer)
```

### 网络请求处理

```js
const response = await fetch('/api/data')
const buffer = await response.arrayBuffer()

// 转换为字符串
const text = binary.arrayBuffer.toString(buffer)

// 或转换为 Base64
const base64 = binary.arrayBuffer.toBase64(buffer)
```

### 文件读取

```js
const input = document.querySelector('input[type="file"]')
const file = input.files[0]

const reader = new FileReader()
reader.onload = () => {
  const buffer = reader.result
  const hex = binary.arrayBuffer.toHex(buffer)
  console.log('File hex:', hex)
}
reader.readAsArrayBuffer(file)
```

## 替代旧 API

```js
// 旧 API
import { arrayBufferToBase64, arrayBufferToBlob } from 'js-cool'
arrayBufferToBase64(buffer)
arrayBufferToBlob(buffer, 'text/plain')

// 新 API (v6.0.0)
import { binary } from 'js-cool'
binary.arrayBuffer.toBase64(buffer)
binary.arrayBuffer.toBlob(buffer, 'text/plain')
```

## 相关

- [binary](/zh/api/binary/) - Binary 模块概述
- [arrayBufferToBase64](/zh/api/convert/array-buffer-to-base64) - ArrayBuffer 转 Base64（旧 API）
