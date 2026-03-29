# binary <Badge type="info" text="v6.0.0" />

统一的二进制数据转换 API，提供链式调用、类型检测、哈希计算等功能。

## 用法

```js
import { binary } from 'js-cool'
```

## 概述

`binary` 模块提供了统一的二进制数据转换接口，支持 Blob、File、ArrayBuffer、Base64 等多种格式之间的相互转换。

### 主要特性

- **链式转换** - 使用 `binary.from().toXxx()` 进行链式转换
- **类型检测** - `isBlob()`, `isFile()`, `isArrayBuffer()`, `isDataURL()`, `isBase64()`
- **子模块 API** - `base64`, `blob`, `arrayBuffer`, `file`, `url`, `svg`, `text`, `dataURL`, `hex`, `hash`, `meta`
- **工具方法** - `compare()`, `clone()`, `download()`, `parse()`
- **IE11 兼容** - 内置兼容性处理

## 链式转换

```js
// 从 Blob 转换
const blob = new Blob(['Hello World'], { type: 'text/plain' })
const base64 = await binary.from(blob).toBase64()
const arrayBuffer = await binary.from(blob).toArrayBuffer()
const url = await binary.from(blob).toURL()

// 从 File 转换
const file = input.files[0]
const base64 = await binary.from(file).toBase64()
const dataUrl = await binary.from(file).toDataURL()

// 从 Base64 转换
const blob = await binary.from(base64String).toBlob('image/png')
const file = await binary.from(base64String).toFile('image.png', 'image/png')

// 从 ArrayBuffer 转换
const buffer = new ArrayBuffer(10)
const base64 = await binary.from(buffer).toBase64()
```

## 类型检测

```js
binary.isBlob(data) // 检测是否为 Blob
binary.isFile(data) // 检测是否为 File
binary.isArrayBuffer(data) // 检测是否为 ArrayBuffer
binary.isDataURL(str) // 检测是否为 Data URL
binary.isBase64(str) // 检测是否为 Base64 字符串
```

## 子模块

### binary.base64

Base64 编解码模块。

```js
// 编码
const encoded = binary.base64.encode('Hello World')

// 解码
const decoded = binary.base64.decode(encoded)

// 转换
const blob = binary.base64.toBlob(base64String, 'image/png')
const buffer = binary.base64.toArrayBuffer(base64String)
const dataUrl = binary.base64.toDataURL(base64String, 'image/png')
const file = binary.base64.toFile(base64String, 'image.png', 'image/png')
```

### binary.blob

Blob 操作模块。

```js
// 转换
const base64 = await binary.blob.toBase64(blob)
const buffer = await binary.blob.toArrayBuffer(blob)
const dataUrl = await binary.blob.toDataURL(blob)
const file = binary.blob.toFile(blob, 'file.txt')

// 创建 URL
const { url, revoke } = binary.blob.toURL(blob)
// 使用完后释放
revoke()

// 合并 Blob
const combined = binary.blob.concat([blob1, blob2], 'text/plain')

// 切片
const sliced = binary.blob.slice(blob, 0, 1024)
```

### binary.arrayBuffer

ArrayBuffer 转换模块。

```js
const base64 = binary.arrayBuffer.toBase64(buffer)
const dataUrl = binary.arrayBuffer.toDataURL(buffer, 'image/png')
const blob = binary.arrayBuffer.toBlob(buffer, 'image/png')
const str = binary.arrayBuffer.toString(buffer, 'utf-8')
const hex = binary.arrayBuffer.toHex(buffer)
```

### binary.file

File 转换模块。

```js
const base64 = await binary.file.toBase64(file)
const buffer = await binary.file.toArrayBuffer(file)
const blob = binary.file.toBlob(file)
```

### binary.url

URL 转换模块。

```js
// 从 URL 获取 Blob
const blob = await binary.url.toBlob('https://example.com/image.png')

// 从 URL 获取 Data URL
const dataUrl = await binary.url.toDataURL('https://example.com/image.png')
```

### binary.svg

SVG 转换模块。

```js
const svgString = '<svg>...</svg>'

const blob = binary.svg.toBlob(svgString)
const dataUrl = binary.svg.toDataURL(svgString)
const { url, revoke } = binary.svg.toURL(svgString)
```

### binary.text

文本编解码模块。

```js
// 字符串与 ArrayBuffer 互转
const buffer = binary.text.encode('Hello World')
const str = binary.text.decode(buffer)

// 字符串与 Base64 互转
const base64 = binary.text.toBase64('Hello World')
const str = binary.text.fromBase64(base64)
```

### binary.dataURL

Data URL 解析模块。

```js
const dataUrl = 'data:image/png;base64,iVBORw0KGgo...'

// 解析
const { mime, base64, data } = binary.dataURL.parse(dataUrl)

// 构建
const url = binary.dataURL.build(base64String, 'image/png')

// 验证
const valid = binary.dataURL.isValid(dataUrl)
```

### binary.hex

十六进制编解码模块。

```js
// ArrayBuffer 转 Hex
const hex = binary.hex.encode(buffer)

// Hex 转 ArrayBuffer
const buffer = binary.hex.decode(hexString)
```

### binary.hash

哈希计算模块。

```js
// 计算哈希
const md5Hash = await binary.hash.md5(data)
const sha1Hash = await binary.hash.sha1(data)
const sha256Hash = await binary.hash.sha256(data)

// CRC32（同步）
const crc = binary.hash.crc32(data)
```

### binary.meta

文件元数据模块。

```js
const meta = binary.meta.get(file)
// {
//   size: 1024,
//   mime: 'image/png',
//   name: 'image.png',
//   extension: 'png',
//   isImage: true,
//   isVideo: false,
//   isAudio: false,
//   isText: false
// }
```

## 工具方法

### binary.compare()

比较两个二进制数据是否相同。

```js
const blob1 = new Blob(['Hello'])
const blob2 = new Blob(['Hello'])
const same = await binary.compare(blob1, blob2) // true
```

### binary.clone()

克隆二进制数据。

```js
const blob = new Blob(['Hello'])
const cloned = binary.clone(blob)
```

### binary.download()

下载二进制数据为文件。

```js
const blob = new Blob(['Hello World'], { type: 'text/plain' })
binary.download(blob, 'hello.txt')
```

### binary.parse()

解析二进制数据，返回类型信息。

```js
const info = binary.parse(data)
// {
//   data: ...,
//   type: 'blob' | 'file' | 'arrayBuffer' | 'base64' | 'dataURL' | 'url' | 'svg',
//   mime: 'text/plain',
//   size: 1024
// }
```
