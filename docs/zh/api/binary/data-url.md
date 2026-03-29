# binary.dataURL <Badge type="info" text="v6.0.0" />

Data URL 解析子模块。

## 用法

```js
import { binary } from 'js-cool'

const { dataURL } = binary
```

## 方法

### parse(dataURL)

解析 Data URL 为组件。

```typescript
function parse(dataURL: string): {
  mime: string
  base64: string
  data: ArrayBuffer
}
```

```js
const dataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='

const { mime, base64, data } = binary.dataURL.parse(dataUrl)
console.log(mime)    // 'image/png'
console.log(base64)  // 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
console.log(data)    // ArrayBuffer
```

### build(base64, mime)

从 Base64 和 MIME 类型构建 Data URL。

```typescript
function build(base64: string, mime: string): string
```

```js
const base64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
const dataUrl = binary.dataURL.build(base64, 'image/png')
console.log(dataUrl) // 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
```

### isValid(str)

检查字符串是否为有效的 Data URL。

```typescript
function isValid(str: string): boolean
```

```js
binary.dataURL.isValid('data:image/png;base64,iVBORw0KGgo...')
// true

binary.dataURL.isValid('https://example.com/image.png')
// false
```

## 示例

### 解析用户粘贴的 Data URL

```js
input.addEventListener('paste', async (e) => {
  const text = e.clipboardData.getData('text')

  if (binary.dataURL.isValid(text)) {
    const { mime, data } = binary.dataURL.parse(text)

    if (mime.startsWith('image/')) {
      const blob = new Blob([data], { type: mime })
      const url = URL.createObjectURL(blob)
      previewImage.src = url
    }
  }
})
```

### 从 Base64 构建 Data URL

```js
const base64String = 'SGVsbG8gV29ybGQ='
const dataUrl = binary.dataURL.build(base64String, 'text/plain')
console.log(dataUrl) // 'data:text/plain;base64,SGVsbG8gV29ybGQ='
```

### 提取 Base64 数据

```js
const dataUrl = 'data:image/png;base64,iVBORw0KGgo...'
const { mime, base64 } = binary.dataURL.parse(dataUrl)

// 存储 Base64（不含前缀）
localStorage.setItem('imageBase64', base64)

// 重新构建
const rebuilt = binary.dataURL.build(base64, mime)
```

## Data URL 格式

```
data:[<mediatype>][;base64],<data>
```

例如：
- `data:text/plain;base64,SGVsbG8=`
- `data:image/png;base64,iVBORw0KGgo...`
- `data:text/html,<h1>Hello</h1>`

## 相关

- [binary](/zh/api/binary/) - Binary 模块概述
