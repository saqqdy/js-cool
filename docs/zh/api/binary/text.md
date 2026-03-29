# binary.text <Badge type="info" text="v6.0.0" />

文本编解码子模块，处理字符串与二进制数据之间的转换。

## 用法

```js
import { binary } from 'js-cool'

const { text } = binary
```

## 方法

### encode(str, encoding?)

将字符串编码为 ArrayBuffer。

```typescript
function encode(str: string, encoding?: string): ArrayBuffer
```

```js
const buffer = binary.text.encode('Hello World')
console.log(buffer.byteLength) // 11
```

### decode(buffer, encoding?)

将 ArrayBuffer 解码为字符串。

```typescript
function decode(buffer: ArrayBuffer, encoding?: string): string
```

```js
const buffer = binary.text.encode('Hello World')
const str = binary.text.decode(buffer)
console.log(str) // 'Hello World'
```

### toBase64(str)

将字符串转换为 Base64。

```typescript
function toBase64(str: string): string
```

```js
const base64 = binary.text.toBase64('Hello World')
console.log(base64) // 'SGVsbG8gV29ybGQ='
```

### fromBase64(base64)

将 Base64 转换为字符串。

```typescript
function fromBase64(base64: string): string
```

```js
const str = binary.text.fromBase64('SGVsbG8gV29ybGQ=')
console.log(str) // 'Hello World'
```

## 示例

### 字符串与 ArrayBuffer 互转

```js
const str = 'Hello 世界'

// 编码
const buffer = binary.text.encode(str)

// 解码
const decoded = binary.text.decode(buffer)
console.log(decoded) // 'Hello 世界'
```

### 字符串与 Base64 互转

```js
const str = 'Hello World'

// 编码
const base64 = binary.text.toBase64(str)
console.log(base64) // 'SGVsbG8gV29ybGQ='

// 解码
const decoded = binary.text.fromBase64(base64)
console.log(decoded) // 'Hello World'
```

### 与其他模块配合

```js
// 字符串 -> ArrayBuffer -> Blob
const str = 'Hello World'
const buffer = binary.text.encode(str)
const blob = binary.arrayBuffer.toBlob(buffer, 'text/plain')

// 下载为文本文件
binary.download(blob, 'hello.txt')
```

## 编码说明

- 默认使用 UTF-8 编码
- 支持中文、表情等 Unicode 字符
- `encoding` 参数可选，用于指定其他编码（如 'gbk'）

## 相关

- [binary](/zh/api/binary/) - Binary 模块概述
- [binary.base64](/zh/api/binary/base64) - Base64 子模块
