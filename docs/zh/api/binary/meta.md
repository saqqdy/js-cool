# binary.meta <Badge type="info" text="v6.0.0" />

文件元数据子模块，用于获取文件的元信息。

## 用法

```js
import { binary } from 'js-cool'

const { meta } = binary
```

## 方法

### get(data)

获取文件或 Blob 的元数据。

```typescript
function get(data: Blob | File): BinaryMeta

interface BinaryMeta {
  size: number // 文件大小（字节）
  mime: string // MIME 类型
  name?: string // 文件名（仅 File）
  lastModified?: number // 最后修改时间（仅 File）
  extension?: string // 文件扩展名
  isImage: boolean // 是否为图片
  isVideo: boolean // 是否为视频
  isAudio: boolean // 是否为音频
  isText: boolean // 是否为文本
}
```

## 示例

### 获取文件信息

```js
const input = document.querySelector('input[type="file"]')
const file = input.files[0]

const info = binary.meta.get(file)
console.log(info)
// {
//   size: 102400,
//   mime: 'image/png',
//   name: 'photo.png',
//   lastModified: 1711234567890,
//   extension: 'png',
//   isImage: true,
//   isVideo: false,
//   isAudio: false,
//   isText: false
// }
```

### 文件类型判断

```js
const file = input.files[0]
const info = binary.meta.get(file)

if (info.isImage) {
  console.log('这是一个图片文件')
} else if (info.isVideo) {
  console.log('这是一个视频文件')
} else if (info.isAudio) {
  console.log('这是一个音频文件')
}
```

### 文件大小检查

```js
const file = input.files[0]
const info = binary.meta.get(file)

const maxSize = 10 * 1024 * 1024 // 10MB
if (info.size > maxSize) {
  alert('文件大小不能超过 10MB')
}
```

### MIME 类型检查

```js
const file = input.files[0]
const info = binary.meta.get(file)

const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
if (!allowedTypes.includes(info.mime)) {
  alert('只支持 JPG、PNG、GIF 格式的图片')
}
```

### Blob 元数据

```js
const blob = new Blob(['Hello World'], { type: 'text/plain' })
const info = binary.meta.get(blob)
console.log(info)
// {
//   size: 11,
//   mime: 'text/plain',
//   extension: 'txt',
//   isImage: false,
//   isVideo: false,
//   isAudio: false,
//   isText: true
// }
// name 和 lastModified 不会存在于 Blob 中
```

## 类型检测

`isImage`、`isVideo`、`isAudio`、`isText` 基于 MIME 类型判断：

| 类型 | MIME 前缀                                          |
| ---- | -------------------------------------------------- |
| 图片 | `image/*`                                          |
| 视频 | `video/*`                                          |
| 音频 | `audio/*`                                          |
| 文本 | `text/*`, `application/json`, `application/xml` 等 |

## 相关

- [binary](/zh/api/binary/) - Binary 模块概述
