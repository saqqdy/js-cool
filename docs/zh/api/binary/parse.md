# binary.parse() <Badge type="info" text="v6.0.0" />

解析二进制数据，返回类型和元信息。

## 用法

```js
import { binary } from 'js-cool'

const info = binary.parse(data)
```

## 签名

```typescript
function parse(input: BinaryInput): BinaryData

interface BinaryData {
  data: Blob | File | ArrayBuffer | string
  type: 'blob' | 'file' | 'arrayBuffer' | 'base64' | 'dataURL' | 'url' | 'svg'
  mime?: string
  name?: string
  size: number
}
```

## 参数

| 参数    | 类型          | 描述       |
| ------- | ------------- | ---------- |
| `input` | `BinaryInput` | 输入数据   |

## 返回值

`BinaryData` - 包含数据类型和元信息的对象。

## 示例

### 解析 File

```js
const file = input.files[0]
const info = binary.parse(file)

console.log(info.type) // 'file'
console.log(info.mime) // 'image/png'
console.log(info.name) // 'photo.png'
console.log(info.size) // 102400
```

### 解析 Blob

```js
const blob = new Blob(['Hello'], { type: 'text/plain' })
const info = binary.parse(blob)

console.log(info.type) // 'blob'
console.log(info.mime) // 'text/plain'
console.log(info.size) // 5
```

### 解析 Base64

```js
const base64 = 'SGVsbG8gV29ybGQ='
const info = binary.parse(base64)

console.log(info.type) // 'base64'
console.log(info.size) // 11 (估算)
```

### 解析 Data URL

```js
const dataUrl = 'data:image/png;base64,iVBORw0KGgo...'
const info = binary.parse(dataUrl)

console.log(info.type) // 'dataURL'
console.log(info.mime) // 'image/png'
```

### 根据类型处理

```js
const data = someBinaryData
const info = binary.parse(data)

switch (info.type) {
  case 'file':
    console.log('文件名:', info.name)
    break
  case 'blob':
    console.log('Blob 类型:', info.mime)
    break
  case 'base64':
    console.log('Base64 数据')
    break
  case 'dataURL':
    console.log('Data URL, MIME:', info.mime)
    break
}
```

## 类型识别

| 类型           | 判断条件                    |
| -------------- | --------------------------- |
| `file`         | `instanceof File`           |
| `blob`         | `instanceof Blob`           |
| `arrayBuffer`  | `instanceof ArrayBuffer`    |
| `dataURL`      | 以 `data:` 开头             |
| `url`          | 以 `http://` 或 `https://` 开头 |
| `base64`       | 可能是有效的 Base64 字符串  |

## 相关

- [binary](/zh/api/binary/) - Binary 模块概述
