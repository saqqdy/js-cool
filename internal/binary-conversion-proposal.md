# Binary Conversion 重构方案

## 现有问题分析

### 1. 函数散乱，缺乏统一入口

当前 11 个转换函数分散在 `src/` 目录，用户需要记住多个函数名：

```typescript
import {
  blobToUrl,
  svgToBlob,
  arrayBufferToBase64,
  base64ToArrayBuffer,
  arrayBufferToBlob,
  base64ToBlob,
  base64ToFile,
  blobToArrayBuffer,
  blobToBase64,
  fileToBase64,
  urlToBlob
} from 'js-cool'
```

### 2. 现有代码问题

| 方法 | 问题 |
|------|------|
| `arrayBufferToBase64` | 使用 spread operator，大文件会爆栈 |
| `urlToBlob` | `!fetch` 判断不严谨，未检查 HTTP 状态码 |
| `base64ToBlob` | 不支持纯 base64 字符串（无 data URL 前缀） |
| `base64ToFile` | 同上，不支持纯 base64 |
| `blobToUrl` | 缺少自动清理机制，用户容易忘记 revoke |
| `base64ToArrayBuffer` | `split(',')` 可能误分割 base64 内容中的逗号 |
| 类型不一致 | 有的返回 `ArrayBuffer`，有的返回 `Uint8Array` |

### 3. 缺少的方法

- `blobToFile` - Blob 转 File
- `base64ToString` - Base64 直接转字符串
- `stringToBase64` - 字符串转 Base64
- `dataURLToBlob` - 明确区分 dataURL 和纯 base64

---

## 新 API 设计

### 命名空间模式

采用与 `date`、`storage` 一致的命名空间模式：

```typescript
import { binary } from 'js-cool'
```

### API 总览

```typescript
// ==================== 类型检测 ====================
binary.isBlob(value): boolean
binary.isFile(value): boolean
binary.isArrayBuffer(value): boolean
binary.isDataURL(value): boolean
binary.isBase64(value): boolean

// ==================== 链式转换 ====================
binary.from(input: BinaryInput): BinaryConverter

// ==================== 基础转换子模块 ====================
// Base64 操作
binary.base64.encode(str: string): string
binary.base64.decode(base64: string): string
binary.base64.toBlob(base64: string, mime?: string): Blob
binary.base64.toArrayBuffer(base64: string): ArrayBuffer
binary.base64.toDataURL(base64: string, mime: string): string
binary.base64.toFile(base64: string, filename: string, mime?: string): File

// Blob 操作
binary.blob.toBase64(blob: Blob): Promise<string>
binary.blob.toArrayBuffer(blob: Blob): Promise<ArrayBuffer>
binary.blob.toDataURL(blob: Blob): Promise<string>
binary.blob.toFile(blob: Blob, filename: string): File
binary.blob.toURL(blob: Blob): { url: string; revoke: () => void }
binary.blob.concat(blobs: Blob[], mime?: string): Blob
binary.blob.slice(blob: Blob, start: number, end: number): Blob

// ArrayBuffer 操作
binary.arrayBuffer.toBase64(buffer: ArrayBuffer, mime?: string): string
binary.arrayBuffer.toDataURL(buffer: ArrayBuffer, mime: string): string
binary.arrayBuffer.toBlob(buffer: ArrayBuffer, mime?: string): Blob
binary.arrayBuffer.toString(buffer: ArrayBuffer, encoding?: string): string
binary.arrayBuffer.toHex(buffer: ArrayBuffer): string

// File 操作
binary.file.toBase64(file: File): Promise<string>
binary.file.toArrayBuffer(file: File): Promise<ArrayBuffer>
binary.file.toBlob(file: File): Blob

// URL 操作
binary.url.toBlob(url: string): Promise<Blob>
binary.url.toDataURL(url: string): Promise<string>

// SVG 操作
binary.svg.toBlob(svgString: string): Blob
binary.svg.toDataURL(svgString: string): string
binary.svg.toURL(svgString: string): { url: string; revoke: () => void }

// ==================== 增强功能子模块 ====================
// Text 文本编码
binary.text.encode(str: string, encoding?: string): ArrayBuffer
binary.text.decode(buffer: ArrayBuffer, encoding?: string): string
binary.text.toBase64(str: string): string
binary.text.fromBase64(base64: string): string

// DataURL 增强
binary.dataURL.parse(dataURL: string): { mime: string; base64: string; data: ArrayBuffer }
binary.dataURL.build(base64: string, mime: string): string
binary.dataURL.isValid(str: string): boolean

// Hex 十六进制
binary.hex.encode(buffer: ArrayBuffer): string
binary.hex.decode(hex: string): ArrayBuffer

// Hash 哈希
binary.hash.md5(data: BinaryInput): Promise<string>
binary.hash.sha1(data: BinaryInput): Promise<string>
binary.hash.sha256(data: BinaryInput): Promise<string>
binary.hash.crc32(data: BinaryInput): Promise<number>

// Meta 元信息
binary.meta.get(data: Blob | File): BinaryMeta

// Image 图片处理
binary.image.resize(blob: Blob, options: ResizeOptions): Promise<Blob>
binary.image.compress(blob: Blob, quality: number): Promise<Blob>
binary.image.getDimensions(blob: Blob): Promise<{ width: number; height: number }>
binary.image.crop(blob: Blob, rect: { x: number; y: number; width: number; height: number }): Promise<Blob>
binary.image.rotate(blob: Blob, degrees: number): Promise<Blob>
binary.image.convert(blob: Blob, format: 'png' | 'jpeg' | 'webp'): Promise<Blob>
binary.image.toCanvas(blob: Blob): Promise<HTMLCanvasElement>
binary.image.fromCanvas(canvas: HTMLCanvasElement, format?: string): Promise<Blob>

// Compress 压缩
binary.compress.gzip(data: Blob | ArrayBuffer): Promise<Blob>
binary.compress.gunzip(data: Blob | ArrayBuffer): Promise<Blob>
binary.compress.deflate(data: Blob | ArrayBuffer): Promise<Blob>
binary.compress.inflate(data: Blob | ArrayBuffer): Promise<Blob>

// Chunk 分片
binary.chunk.split(data: Blob | ArrayBuffer, chunkSize: number): Blob[] | ArrayBuffer[]
binary.chunk.merge(chunks: Blob[] | ArrayBuffer[]): Blob

// Stream 流式处理
binary.stream.fromBlob(blob: Blob): ReadableStream<Uint8Array>
binary.stream.toBlob(stream: ReadableStream): Promise<Blob>
binary.stream.iterate(data: Blob | ArrayBuffer, chunkSize?: number): AsyncIterable<Uint8Array>

// ==================== 工具方法 ====================
binary.compare(a: BinaryInput, b: BinaryInput): Promise<boolean>
binary.clone(data: Blob | File | ArrayBuffer): Blob | ArrayBuffer
binary.download(data: Blob | File | ArrayBuffer, filename: string): void
```

---

## 链式转换 API

### BinaryConverter 接口

```typescript
interface BinaryConverter {
  // 转换为目标类型
  toBase64(): Promise<string>
  toDataURL(mime?: string): Promise<string>
  toArrayBuffer(): Promise<ArrayBuffer>
  toBlob(mime?: string): Promise<Blob>
  toFile(filename: string, mime?: string): Promise<File>
  toURL(): Promise<{ url: string; revoke: () => void }>

  // 获取元信息
  getMime(): string | undefined
  getSize(): number

  // 增强方法
  hash(algorithm: 'md5' | 'sha1' | 'sha256'): Promise<string>
  compress(algorithm: 'gzip' | 'deflate'): Promise<Blob>
}
```

### 使用示例

```typescript
import { binary } from 'js-cool'

// Blob 转换
const blob = new Blob(['Hello'], { type: 'text/plain' })
const base64 = await binary.from(blob).toBase64()
const buffer = await binary.from(blob).toArrayBuffer()
const url = await binary.from(blob).toURL()
url.revoke()  // 清理

// Base64 转换
const base64Str = 'SGVsbG8gV29ybGQ='
const blob = await binary.from(base64Str).toBlob('text/plain')
const buffer = await binary.from(base64Str).toArrayBuffer()

// data URL 转换
const dataURL = 'data:image/png;base64,iVBORw0KGgo...'
const blob = await binary.from(dataURL).toBlob()  // 自动识别 mime
const file = await binary.from(dataURL).toFile('image.png')

// ArrayBuffer 转换
const buffer = new ArrayBuffer(8)
const base64 = binary.from(buffer).toBase64()
const blob = binary.from(buffer).toBlob('application/octet-stream')

// File 转换
const file = document.querySelector('input[type="file"]').files[0]
const base64 = await binary.from(file).toBase64()
const buffer = await binary.from(file).toArrayBuffer()

// URL 转换（需要异步）
const blob = await binary.from('https://example.com/image.png').toBlob()
const base64 = await binary.from('https://example.com/image.png').toDataURL()

// SVG 转换
const svgString = '<svg>...</svg>'
const blob = binary.from(svgString).toBlob()  // 自动设为 image/svg+xml

// 链式调用增强方法
const hash = await binary.from(blob).hash('sha256')
const compressed = await binary.from(blob).compress('gzip')
```

---

## 增强功能详解

### 1. Text 文本编码

```typescript
// 字符串编码
const buffer = binary.text.encode('Hello 世界', 'utf-8')
const base64 = binary.text.toBase64('Hello 世界')

// 解码
const str = binary.text.decode(buffer, 'utf-8')
const fromB64 = binary.text.fromBase64('SGVsbG8g5LiW55WM')

// 支持编码：utf-8, utf-16le, utf-16be, ascii, iso-8859-1 等
```

### 2. DataURL 增强

```typescript
// 解析 data URL
const parsed = binary.dataURL.parse('data:image/png;base64,iVBORw0KGgo...')
// => { mime: 'image/png', base64: 'iVBORw0KGgo...', data: ArrayBuffer }

// 构建 data URL
const dataURL = binary.dataURL.build('iVBORw0KGgo...', 'image/png')

// 验证
binary.dataURL.isValid('data:text/plain;base64,SGVsbG8=') // true
```

### 3. Hex 十六进制

```typescript
// ArrayBuffer 转 Hex
const hex = binary.hex.encode(buffer) // '48656c6c6f'

// Hex 转 ArrayBuffer
const buffer = binary.hex.decode('48656c6c6f')
```

### 4. Hash 哈希

```typescript
// 计算哈希
const md5 = await binary.hash.md5(blob)
const sha256 = await binary.hash.sha256(file)
const crc32 = await binary.hash.crc32(buffer)

// 用于文件去重
const fileHash = await binary.from(file).hash('sha256')
```

### 5. Meta 元信息

```typescript
interface BinaryMeta {
  size: number
  mime: string
  name?: string
  lastModified?: number
  extension?: string      // 从 mime 或名称推断
  isImage: boolean
  isVideo: boolean
  isAudio: boolean
  isText: boolean
}

const meta = binary.meta.get(file)
// => { size: 1024, mime: 'image/png', extension: 'png', isImage: true, ... }
```

### 6. Image 图片处理

```typescript
// 缩放
const resized = await binary.image.resize(blob, {
  width: 800,
  height: 600,
  fit: 'contain' | 'cover' | 'fill',
  quality: 0.9
})

// 压缩
const compressed = await binary.image.compress(blob, 0.8)

// 获取尺寸
const { width, height } = await binary.image.getDimensions(blob)

// 裁剪
const cropped = await binary.image.crop(blob, { x: 0, y: 0, width: 100, height: 100 })

// 旋转
const rotated = await binary.image.rotate(blob, 90)

// 格式转换
const png = await binary.image.convert(blob, 'png')

// Canvas 互转
const canvas = await binary.image.toCanvas(blob)
const newBlob = await binary.image.fromCanvas(canvas, 'image/png')
```

### 7. Compress 压缩

```typescript
// Gzip 压缩/解压
const compressed = await binary.compress.gzip(blob)
const decompressed = await binary.compress.gunzip(compressed)

// Deflate 压缩/解压
const deflated = await binary.compress.deflate(buffer)
const inflated = await binary.compress.inflate(deflated)
```

### 8. Chunk 分片

```typescript
// 分片
const chunks = binary.chunk.split(blob, 1024 * 1024) // 1MB chunks

// 合并
const merged = binary.chunk.merge(chunks)
```

### 9. Stream 流式处理

```typescript
// 创建可读流
const stream = binary.stream.fromBlob(blob)

// 流转 Blob
const newBlob = await binary.stream.toBlob(stream)

// 迭代处理大文件
for await (const chunk of binary.stream.iterate(blob, 64 * 1024)) {
  // 逐块处理，避免内存溢出
  processChunk(chunk)
}
```

### 10. 工具方法

```typescript
// 内容比较
const same = await binary.compare(blob1, blob2)

// 克隆
const cloned = binary.clone(blob)

// 下载
binary.download(blob, 'file.txt')
```

---

## 旧方法映射

### 映射表

| 旧方法 | 新方法 |
|--------|--------|
| `blobToUrl(blob)` | `binary.blob.toURL(blob)` 或 `binary.from(blob).toURL()` |
| `svgToBlob(svg)` | `binary.svg.toBlob(svg)` 或 `binary.from(svg).toBlob()` |
| `arrayBufferToBase64(buf, mime)` | `binary.arrayBuffer.toBase64(buf, mime)` |
| `base64ToArrayBuffer(b64)` | `binary.base64.toArrayBuffer(b64)` |
| `arrayBufferToBlob(buf, mime)` | `binary.arrayBuffer.toBlob(buf, mime)` |
| `base64ToBlob(b64)` | `binary.base64.toBlob(b64)` |
| `base64ToFile(b64, name)` | `binary.base64.toFile(b64, name)` |
| `blobToArrayBuffer(blob)` | `binary.blob.toArrayBuffer(blob)` |
| `blobToBase64(blob)` | `binary.blob.toBase64(blob)` |
| `fileToBase64(file)` | `binary.file.toBase64(file)` |
| `urlToBlob(url)` | `binary.url.toBlob(url)` |

### 新增方法总览

| 类别 | 方法 |
|------|------|
| **新增转换** | `blob.toFile`, `file.toBlob`, `base64.encode/decode`, `arrayBuffer.toString/toHex` |
| **文本编码** | `text.encode/decode`, `text.toBase64/fromBase64` |
| **DataURL** | `dataURL.parse/build/isValid` |
| **十六进制** | `hex.encode/decode` |
| **哈希** | `hash.md5/sha1/sha256/crc32` |
| **元信息** | `meta.get` |
| **图片处理** | `image.resize/compress/crop/rotate/convert/getDimensions/toCanvas/fromCanvas` |
| **压缩** | `compress.gzip/gunzip/deflate/inflate` |
| **分片** | `chunk.split/merge` |
| **流式** | `stream.fromBlob/toBlob/iterate` |
| **工具** | `compare/clone/download` |
| **类型检测** | `isBlob/isFile/isArrayBuffer/isDataURL/isBase64` |

---

## 类型定义

```typescript
type BinaryInput =
  | Blob
  | File
  | ArrayBuffer
  | Uint8Array
  | string  // base64, data URL, or URL

interface BinaryData {
  data: Blob | File | ArrayBuffer | string
  type: 'blob' | 'file' | 'arrayBuffer' | 'base64' | 'dataURL' | 'url'
  mime?: string
  name?: string
  size: number
}

interface BinaryMeta {
  size: number
  mime: string
  name?: string
  lastModified?: number
  extension?: string
  isImage: boolean
  isVideo: boolean
  isAudio: boolean
  isText: boolean
}

interface ResizeOptions {
  width?: number
  height?: number
  fit?: 'contain' | 'cover' | 'fill'
  quality?: number
}

interface BinaryConverter {
  toBase64(): Promise<string>
  toDataURL(mime?: string): Promise<string>
  toArrayBuffer(): Promise<ArrayBuffer>
  toBlob(mime?: string): Promise<Blob>
  toFile(filename: string, mime?: string): Promise<File>
  toURL(): Promise<{ url: string; revoke: () => void }>
  getMime(): string | undefined
  getSize(): number
  hash(algorithm: 'md5' | 'sha1' | 'sha256'): Promise<string>
  compress(algorithm: 'gzip' | 'deflate'): Promise<Blob>
}

interface BinaryAPI {
  // 类型检测
  isBlob(value: unknown): value is Blob
  isFile(value: unknown): value is File
  isArrayBuffer(value: unknown): value is ArrayBuffer
  isDataURL(value: unknown): boolean
  isBase64(value: unknown): boolean

  // 链式转换
  from(input: BinaryInput, options?: BinaryFromOptions): BinaryConverter

  // 解析
  parse(input: BinaryInput): BinaryData

  // 基础转换子模块
  base64: Base64API
  blob: BlobAPI
  arrayBuffer: ArrayBufferAPI
  file: FileAPI
  url: URLAPI
  svg: SVGAPI

  // 增强功能子模块
  text: TextAPI
  dataURL: DataURLAPI
  hex: HexAPI
  hash: HashAPI
  meta: MetaAPI
  image: ImageAPI
  compress: CompressAPI
  chunk: ChunkAPI
  stream: StreamAPI

  // 工具方法
  compare(a: BinaryInput, b: BinaryInput): Promise<boolean>
  clone(data: Blob | File | ArrayBuffer): Blob | ArrayBuffer
  download(data: Blob | File | ArrayBuffer, filename: string): void
}

interface BlobAPI {
  toBase64(blob: Blob): Promise<string>
  toArrayBuffer(blob: Blob): Promise<ArrayBuffer>
  toDataURL(blob: Blob): Promise<string>
  toFile(blob: Blob, filename: string): File
  toURL(blob: Blob): { url: string; revoke: () => void }
  concat(blobs: Blob[], mime?: string): Blob
  slice(blob: Blob, start: number, end: number): Blob
}

interface Base64API {
  encode(str: string): string
  decode(base64: string): string
  toBlob(base64: string, mime?: string): Blob
  toArrayBuffer(base64: string): ArrayBuffer
  toDataURL(base64: string, mime: string): string
  toFile(base64: string, filename: string, mime?: string): File
}

interface ArrayBufferAPI {
  toBase64(buffer: ArrayBuffer, mime?: string): string
  toDataURL(buffer: ArrayBuffer, mime: string): string
  toBlob(buffer: ArrayBuffer, mime?: string): Blob
  toString(buffer: ArrayBuffer, encoding?: string): string
  toHex(buffer: ArrayBuffer): string
}

interface FileAPI {
  toBase64(file: File): Promise<string>
  toArrayBuffer(file: File): Promise<ArrayBuffer>
  toBlob(file: File): Blob
}

interface URLAPI {
  toBlob(url: string): Promise<Blob>
  toDataURL(url: string): Promise<string>
}

interface SVGAPI {
  toBlob(svg: string): Blob
  toDataURL(svg: string): string
  toURL(svg: string): { url: string; revoke: () => void }
}

interface TextAPI {
  encode(str: string, encoding?: string): ArrayBuffer
  decode(buffer: ArrayBuffer, encoding?: string): string
  toBase64(str: string): string
  fromBase64(base64: string): string
}

interface DataURLAPI {
  parse(dataURL: string): { mime: string; base64: string; data: ArrayBuffer }
  build(base64: string, mime: string): string
  isValid(str: string): boolean
}

interface HexAPI {
  encode(buffer: ArrayBuffer): string
  decode(hex: string): ArrayBuffer
}

interface HashAPI {
  md5(data: BinaryInput): Promise<string>
  sha1(data: BinaryInput): Promise<string>
  sha256(data: BinaryInput): Promise<string>
  crc32(data: BinaryInput): Promise<number>
}

interface MetaAPI {
  get(data: Blob | File): BinaryMeta
}

interface ImageAPI {
  resize(blob: Blob, options: ResizeOptions): Promise<Blob>
  compress(blob: Blob, quality: number): Promise<Blob>
  getDimensions(blob: Blob): Promise<{ width: number; height: number }>
  crop(blob: Blob, rect: { x: number; y: number; width: number; height: number }): Promise<Blob>
  rotate(blob: Blob, degrees: number): Promise<Blob>
  convert(blob: Blob, format: 'png' | 'jpeg' | 'webp'): Promise<Blob>
  toCanvas(blob: Blob): Promise<HTMLCanvasElement>
  fromCanvas(canvas: HTMLCanvasElement, format?: string): Promise<Blob>
}

interface CompressAPI {
  gzip(data: Blob | ArrayBuffer): Promise<Blob>
  gunzip(data: Blob | ArrayBuffer): Promise<Blob>
  deflate(data: Blob | ArrayBuffer): Promise<Blob>
  inflate(data: Blob | ArrayBuffer): Promise<Blob>
}

interface ChunkAPI {
  split(data: Blob | ArrayBuffer, chunkSize: number): Blob[] | ArrayBuffer[]
  merge(chunks: Blob[] | ArrayBuffer[]): Blob
}

interface StreamAPI {
  fromBlob(blob: Blob): ReadableStream<Uint8Array>
  toBlob(stream: ReadableStream): Promise<Blob>
  iterate(data: Blob | ArrayBuffer, chunkSize?: number): AsyncIterable<Uint8Array>
}
```

---

## IE11 兼容方案

### IE11 不支持的 API

| API | IE11 状态 | 解决方案 |
|-----|-----------|----------|
| `File` 构造函数 | 不支持 | 使用 `Blob` + 手动添加 `name` 属性 |
| `URL.createObjectURL` | 支持 | 无需处理 |
| `btoa` / `atob` | 支持 | 无需处理 |
| `FileReader` | 支持 | 无需处理 |
| `Blob` | 支持 | 无需处理 |
| `ArrayBuffer` | 支持 | 无需处理 |
| `Uint8Array` | 支持 | 无需处理 |
| `TextEncoder` / `TextDecoder` | 不支持 | 提供 polyfill 或替代实现 |
| `CompressionStream` | 不支持 | 降级提示或跳过压缩 |
| `ReadableStream` | 不支持 | 使用回调或 XHR 替代 |
| `Canvas` 图片处理 | 部分支持 | 使用 `canvas.toBlob` polyfill |
| `crypto.subtle` (Hash) | 不支持 | 使用纯 JS 实现或降级 |

### 兼容实现策略

#### 1. File 构造函数兼容

```typescript
// src/binary/_compat.ts

/**
 * IE11 兼容的 File 构造函数
 * IE11 不支持 new File()，降级为 Blob + name 属性
 */
export function createFile(
  parts: BlobPart[],
  name: string,
  options?: BlobPropertyBag
): File | Blob {
  if (typeof File === 'undefined') {
    const blob = new Blob(parts, options)
    ;(blob as any).name = name
    return blob
  }
  return new File(parts, name, options)
}
```

#### 2. TextEncoder / TextDecoder 兼容

```typescript
// src/binary/_compat.ts

/**
 * IE11 兼容的文本编码器
 */
export const textEncoder = {
  encode(str: string): Uint8Array {
    // IE11 不支持 TextEncoder，使用手动编码
    if (typeof TextEncoder !== 'undefined') {
      return new TextEncoder().encode(str)
    }
    // 降级：仅支持 UTF-8 基本字符
    const bytes: number[] = []
    for (let i = 0; i < str.length; i++) {
      let code = str.charCodeAt(i)
      if (code < 0x80) {
        bytes.push(code)
      } else if (code < 0x800) {
        bytes.push(0xc0 | (code >> 6), 0x80 | (code & 0x3f))
      } else {
        bytes.push(0xe0 | (code >> 12), 0x80 | ((code >> 6) & 0x3f), 0x80 | (code & 0x3f))
      }
    }
    return new Uint8Array(bytes)
  }
}

/**
 * IE11 兼容的文本解码器
 */
export const textDecoder = {
  decode(bytes: Uint8Array): string {
    if (typeof TextDecoder !== 'undefined') {
      return new TextDecoder().decode(bytes)
    }
    // 降级：手动解码 UTF-8
    let str = ''
    let i = 0
    while (i < bytes.length) {
      const byte = bytes[i]
      if (byte < 0x80) {
        str += String.fromCharCode(byte)
        i++
      } else if (byte < 0xe0) {
        str += String.fromCharCode(((byte & 0x1f) << 6) | (bytes[i + 1] & 0x3f))
        i += 2
      } else {
        str += String.fromCharCode(
          ((byte & 0x0f) << 12) | ((bytes[i + 1] & 0x3f) << 6) | (bytes[i + 2] & 0x3f)
        )
        i += 3
      }
    }
    return str
  }
}
```

#### 3. 压缩功能降级

```typescript
// src/binary/modules/compress.ts

async function gzip(data: Blob | ArrayBuffer): Promise<Blob> {
  // 检测 CompressionStream 支持
  if (typeof CompressionStream === 'undefined') {
    console.warn('[js-cool] CompressionStream not supported in this browser')
    // 降级：返回原数据
    return data instanceof Blob ? data : new Blob([data])
  }

  const stream = data instanceof Blob
    ? data.stream()
    : new Blob([data]).stream()

  const compressed = stream.pipeThrough(new CompressionStream('gzip'))
  return new Response(compressed).blob()
}
```

#### 4. Hash 功能降级

```typescript
// src/binary/modules/hash.ts

async function sha256(data: BinaryInput): Promise<string> {
  // 优先使用原生 crypto.subtle
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const buffer = await toArrayBuffer(data)
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer)
    return bufferToHex(hashBuffer)
  }

  // 降级：使用纯 JS 实现（需要引入第三方库或简化实现）
  console.warn('[js-cool] crypto.subtle not available, using simplified hash')
  // 可以降级为 crc32 或提示用户引入 polyfill
  const buffer = await toArrayBuffer(data)
  return String(crc32Sync(buffer))
}
```

#### 5. Stream 功能降级

```typescript
// src/binary/modules/stream.ts

function fromBlob(blob: Blob): ReadableStream<Uint8Array> | null {
  // 检测 ReadableStream 支持
  if (typeof ReadableStream === 'undefined') {
    console.warn('[js-cool] ReadableStream not supported')
    return null
  }
  return blob.stream()
}

// 提供替代的迭代方法
async function* iterateCompat(blob: Blob, chunkSize = 64 * 1024): AsyncIterable<Uint8Array> {
  const total = blob.size
  for (let start = 0; start < total; start += chunkSize) {
    const end = Math.min(start + chunkSize, total)
    const chunk = blob.slice(start, end)
    const buffer = await blobToArrayBuffer(chunk)
    yield new Uint8Array(buffer)
  }
}
```

#### 6. Canvas 图片处理兼容

```typescript
// src/binary/modules/image.ts

async function toCanvas(blob: Blob): Promise<HTMLCanvasElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        reject(new Error('Failed to get canvas context'))
        return
      }
      ctx.drawImage(img, 0, 0)
      resolve(canvas)
    }
    img.onerror = reject
    img.src = URL.createObjectURL(blob)
  })
}

async function fromCanvas(canvas: HTMLCanvasElement, mime = 'image/png'): Promise<Blob> {
  return new Promise((resolve, reject) => {
    // 现代浏览器支持 toBlob
    if (canvas.toBlob) {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob)
        else reject(new Error('Failed to convert canvas to blob'))
      }, mime)
    } else {
      // IE11 降级：使用 toDataURL + dataURLToBlob
      const dataURL = canvas.toDataURL(mime)
      resolve(base64ToBlob(dataURL))
    }
  })
}
```

### IE11 兼容配置

```typescript
// src/binary/_compat.ts

export interface CompatConfig {
  /** 是否启用压缩（需要 CompressionStream 支持） */
  compression: boolean
  /** 是否启用 Hash（需要 crypto.subtle 支持） */
  hash: boolean
  /** 是否启用 Stream（需要 ReadableStream 支持） */
  stream: boolean
}

/**
 * 检测浏览器能力
 */
export function detectCapabilities(): CompatConfig {
  return {
    compression: typeof CompressionStream !== 'undefined',
    hash: typeof crypto !== 'undefined' && typeof crypto.subtle !== 'undefined',
    stream: typeof ReadableStream !== 'undefined'
  }
}

/**
 * 获取兼容性警告
 */
export function getCompatWarnings(): string[] {
  const warnings: string[] = []
  const caps = detectCapabilities()

  if (!caps.compression) {
    warnings.push('Compression (gzip/deflate) not supported')
  }
  if (!caps.hash) {
    warnings.push('Hash (SHA-256/MD5) limited, using fallback')
  }
  if (!caps.stream) {
    warnings.push('Stream API not supported, using callbacks')
  }

  return warnings
}
```

### 使用时检测

```typescript
// 用户代码中
import { binary } from 'js-cool'

// 检测功能支持
if (binary.compress.isSupported()) {
  const compressed = await binary.compress.gzip(blob)
} else {
  console.warn('Compression not supported, using original data')
  // 降级处理
}

// 或静默降级
const compressed = await binary.compress.gzip(blob) // 内部自动降级
```

---

## 文件结构

```
src/binary/
├── index.ts              # 主入口，导出 binary 命名空间
├── types.ts              # 类型定义
├── detect.ts             # 类型检测方法
├── converter.ts          # BinaryConverter 类实现
├── _compat.ts            # IE11 兼容层
├── _utils.ts             # 内部工具函数
└── modules/
    ├── base64.ts         # base64 子模块
    ├── blob.ts           # blob 子模块
    ├── arrayBuffer.ts    # arrayBuffer 子模块
    ├── file.ts           # file 子模块
    ├── url.ts            # url 子模块
    ├── svg.ts            # svg 子模块
    ├── text.ts           # text 文本编码子模块
    ├── dataURL.ts        # dataURL 子模块
    ├── hex.ts            # hex 十六进制子模块
    ├── hash.ts           # hash 哈希子模块
    ├── meta.ts           # meta 元信息子模块
    ├── image.ts          # image 图片处理子模块
    ├── compress.ts       # compress 压缩子模块
    ├── chunk.ts          # chunk 分片子模块
    └── stream.ts         # stream 流式处理子模块
```

---

## 迁移策略

### 阶段一：并行存在

1. 创建新的 `binary` 模块
2. 保留旧函数，内部调用新模块
3. 旧函数标记 `@deprecated`，文档引导新 API

```typescript
/**
 * @deprecated Use `binary.blob.toURL()` instead
 * @since 5.13.0
 */
function blobToUrl(input: Blob): string {
  return binary.blob.toURL(input).url
}
```

### 阶段二：主推新 API

1. 文档主要展示新 API
2. 旧函数保留但不推荐

### 阶段三：移除旧函数（可选）

1. 根据使用情况和反馈决定是否移除
2. 可在主版本升级时移除

---

## 实现优先级

### 高优先级

1. 核心转换方法（`base64`, `blob`, `arrayBuffer` 子模块）
2. 链式转换 `binary.from().toX()`
3. 修复现有问题（大文件爆栈、状态码检查等）
4. IE11 兼容层（File 构造函数、TextEncoder/Decoder）

### 中优先级

1. 类型检测方法
2. `file`, `url`, `svg` 子模块
3. `text`, `dataURL`, `hex` 子模块
4. `hash` 子模块（使用 crypto.subtle）
5. `meta` 子模块

### 低优先级

1. `image` 图片处理子模块
2. `compress` 压缩子模块
3. `chunk` 分片子模块
4. `stream` 流式处理子模块
5. 扩展编码支持（更多 encoding 选项）
6. Node.js 环境兼容

---

## 示例对比

### 旧 API

```typescript
import {
  blobToUrl,
  blobToBase64,
  base64ToArrayBuffer,
  arrayBufferToBlob
} from 'js-cool'

const blob = new Blob(['Hello'])
const url = blobToUrl(blob)
URL.revokeObjectURL(url)  // 手动清理

const base64 = await blobToBase64(blob)
const buffer = base64ToArrayBuffer(base64)
const newBlob = arrayBufferToBlob(buffer, 'text/plain')
```

### 新 API

```typescript
import { binary } from 'js-cool'

const blob = new Blob(['Hello'])

// 方式一：便捷方法
const { url, revoke } = binary.blob.toURL(blob)
revoke()  // 自动清理

// 方式二：链式调用
const base64 = await binary.from(blob).toBase64()
const buffer = await binary.from(base64).toArrayBuffer()
const newBlob = await binary.from(buffer).toBlob('text/plain')

// 增强功能
const hash = await binary.from(file).hash('sha256')
const meta = binary.meta.get(file)
const compressed = await binary.compress.gzip(blob)
```
