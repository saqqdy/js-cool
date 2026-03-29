# binary.svg <Badge type="info" text="v6.0.0" />

SVG 转换子模块，将 SVG 字符串转换为各种格式。

## 用法

```js
import { binary } from 'js-cool'

const { svg } = binary
```

## 方法

### toBlob(svg)

将 SVG 字符串转换为 Blob。

```typescript
function toBlob(svg: string): Blob
```

```js
const svgString = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="red"/></svg>'

const blob = binary.svg.toBlob(svgString)
// Blob { type: 'image/svg+xml', size: ... }
```

### toDataURL(svg)

将 SVG 字符串转换为 Data URL。

```typescript
function toDataURL(svg: string): string
```

```js
const svgString = '<svg>...</svg>'
const dataUrl = binary.svg.toDataURL(svgString)
// 'data:image/svg+xml;base64,...'
```

### toURL(svg)

将 SVG 字符串转换为 Blob URL。

```typescript
function toURL(svg: string): { url: string; revoke: () => void }
```

```js
const svgString = '<svg>...</svg>'
const { url, revoke } = binary.svg.toURL(svgString)

// 在 img 标签中使用
img.src = url

// 使用完后释放
revoke()
```

## 示例

### 动态创建 SVG 图片

```js
const svgString = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="40" fill="blue"/>
  </svg>
`

const { url, revoke } = binary.svg.toURL(svgString)
document.getElementById('preview').src = url
```

### SVG 转 PNG（配合 Canvas）

```js
const svgString = '<svg>...</svg>'
const { url, revoke } = binary.svg.toURL(svgString)

const img = new Image()
img.onload = () => {
  const canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height

  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0)

  // 转换为 PNG
  canvas.toBlob(blob => {
    binary.download(blob, 'image.png')
    revoke() // 释放 URL
  })
}
img.src = url
```

### SVG 下载

```js
const svgString = '<svg>...</svg>'
const blob = binary.svg.toURL(svgString).url

// 直接下载 SVG 文件
const blob = binary.svg.toBlob(svgString)
binary.download(blob, 'image.svg')
```

## 替代旧 API

```js
// 旧 API
import { svgToBlob } from 'js-cool'
svgToBlob(svgString)

// 新 API (v6.0.0)
import { binary } from 'js-cool'
binary.svg.toBlob(svgString)
```

## 相关

- [binary](/zh/api/binary/) - Binary 模块概述
