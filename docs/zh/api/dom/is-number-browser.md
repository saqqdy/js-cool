# isNumberBrowser

检测客户端是否为 360 浏览器。

## 用法

```js
import { isNumberBrowser } from 'js-cool'
```

## 签名

```typescript
function isNumberBrowser(userAgent?: string): boolean
```

## 参数

| 参数        | 类型     | 描述                                                    |
| ----------- | -------- | ------------------------------------------------------- |
| `userAgent` | `string` | User Agent 字符串，未提供时默认使用 navigator.userAgent |

## 返回值

`boolean` - 如果是 360 浏览器返回 `true`。

## 示例

```js
// 检查当前浏览器
if (isNumberBrowser()) {
  console.log('正在 360 浏览器中运行')
}

// 使用自定义 User Agent 检查
const ua =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.95 Safari/537.36 QIHU 360EE'
isNumberBrowser(ua) // true

// 另一个 360 浏览器 User Agent
const ua2 =
  'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.95 Safari/537.36'
isNumberBrowser(ua2) // true
```

## 相关

- [inBrowser](/api/dom/in-browser) - 检查是否在浏览器环境中运行
