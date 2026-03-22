# blobToUrl <Badge type="info" text="v5.13.0" />

将 Blob 转换为对象 URL。

## 用法

```js
import { blobToUrl } from 'js-cool'
```

## 签名

```typescript
function blobToUrl(blob: Blob): Promise<string>
```

## 参数

| 参数   | 类型   | 描述      |
| ------ | ------ | --------- |
| `blob` | `Blob` | Blob 输入 |

## 返回值

`Promise<string>` - 对象 URL 字符串。

## 示例

```js
const blob = new Blob(['Hello'], { type: 'text/plain' })
const url = await blobToUrl(blob)
// 'blob:http://example.com/uuid'

// 在 img 标签中使用
const imageBlob = await fetch(imageUrl).then(r => r.blob())
const objectUrl = await blobToUrl(imageBlob)
img.src = objectUrl
```

## 相关

- [urlToBlob](/zh/api/convert/url-to-blob) - URL 转 Blob
