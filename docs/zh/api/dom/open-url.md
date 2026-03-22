# openUrl <Badge type="info" text="v1.0.6" />

在新窗口/标签页中打开 URL。

## 用法

```js
import { openUrl } from 'js-cool'
```

## 签名

```typescript
function openUrl(url: string): void
```

## 参数

| 参数  | 类型     | 描述         |
| ----- | -------- | ------------ |
| `url` | `string` | 要打开的 URL |

## 示例

```js
openUrl('https://example.com')
// 在新标签页中打开

// 打开下载链接
openUrl('/files/document.pdf')
```
