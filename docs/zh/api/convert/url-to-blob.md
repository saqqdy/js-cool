# urlToBlob

将 URL 转换为 Blob。

## 用法

```js
import { urlToBlob } from 'js-cool'
```

## 签名

```typescript
function urlToBlob(url: string): Promise<Blob>
```

## 参数

| 参数  | 类型     | 描述         |
| ----- | -------- | ------------ |
| `url` | `string` | 要获取的 URL |

## 返回值

`Promise<Blob>` - Blob 对象。

## 示例

```js
const blob = await urlToBlob('https://example.com/image.png')

// 用于文件下载
const blob = await urlToBlob(fileUrl)
const url = URL.createObjectURL(blob)
```

## 相关

- [blobToUrl](/zh/api/convert/blob-to-url) - Blob 转 URL
