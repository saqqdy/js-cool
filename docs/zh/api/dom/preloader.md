# preloader

预加载资源（图片、脚本等）。

## 用法

```js
import { preloader } from 'js-cool'
```

## 签名

```typescript
function preloader(resources: string[]): Promise<void>
```

## 参数

| 参数        | 类型       | 描述           |
| ----------- | ---------- | -------------- |
| `resources` | `string[]` | 要预加载的 URL |

## 返回值

`Promise<void>` - 所有资源加载完成后解析。

## 示例

```js
// 预加载图片
preloader(['image1.jpg', 'image2.jpg', 'image3.jpg']).then(() => {
  console.log('所有图片已加载')
})

// 预加载脚本
preloader(['script1.js', 'script2.js'])
```
