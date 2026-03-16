# svgToBlob

将 SVG 字符串转换为 Blob。

## 用法

```js
import { svgToBlob } from 'js-cool'
```

## 签名

```typescript
function svgToBlob(svg: string): Blob
```

## 参数

| 参数  | 类型     | 描述       |
| ----- | -------- | ---------- |
| `svg` | `string` | SVG 字符串 |

## 返回值

`Blob` - 带有 SVG MIME 类型的 Blob。

## 示例

```js
const svg = '<svg>...</svg>'
const blob = svgToBlob(svg)
// Blob { type: 'image/svg+xml' }
```
