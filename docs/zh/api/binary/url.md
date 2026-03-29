# binary.url <Badge type="info" text="v6.0.0" />

URL 转换子模块，从网络 URL 获取二进制数据。

## 用法

```js
import { binary } from 'js-cool'

const { url: urlApi } = binary
```

## 方法

### toBlob(url)

从 URL 获取 Blob。

```typescript
function toBlob(url: string): Promise<Blob>
```

```js
const blob = await binary.url.toBlob('https://example.com/image.png')
console.log(blob.type) // 'image/png'
```

### toDataURL(url)

从 URL 获取 Data URL。

```typescript
function toDataURL(url: string): Promise<string>
```

```js
const dataUrl = await binary.url.toDataURL('https://example.com/image.png')
// 'data:image/png;base64,iVBORw0KGgo...'
```

## 示例

### 下载远程图片

```js
const imageUrl = 'https://example.com/photo.jpg'
const blob = await binary.url.toBlob(imageUrl)

// 创建本地预览
const previewUrl = URL.createObjectURL(blob)
document.getElementById('preview').src = previewUrl
```

### 图片转 Base64

```js
const imageUrl = 'https://example.com/icon.png'
const dataUrl = await binary.url.toDataURL(imageUrl)

// 存储 Base64 到本地
localStorage.setItem('icon', dataUrl)
```

### 批量下载

```js
const urls = [
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg',
  'https://example.com/image3.jpg'
]

const blobs = await Promise.all(
  urls.map(url => binary.url.toBlob(url))
)

// 合并下载
blobs.forEach((blob, index) => {
  binary.download(blob, `image${index + 1}.jpg`)
})
```

### 跨域处理

```js
// 如果资源支持 CORS，可以直接使用
try {
  const blob = await binary.url.toBlob('https://other-domain.com/image.png')
} catch (error) {
  console.error('跨域请求失败:', error)
}
```

::: warning 跨域限制
由于浏览器安全策略，跨域请求需要服务器配置 CORS 头。如果服务器不支持 CORS，请求会失败。
:::

## 相关

- [binary](/zh/api/binary/) - Binary 模块概述
