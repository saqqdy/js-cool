# inBrowser

检查是否在浏览器环境中运行。

## 用法

```js
import { inBrowser } from 'js-cool'
```

## 签名

```typescript
const inBrowser: boolean
```

## 返回值

`boolean` - 如果在浏览器中则为 `true`。

## 示例

```js
if (inBrowser) {
  console.log('在浏览器中运行')
  document.body.classList.add('loaded')
}
```

## 相关

- [inNodeJs](/api/dom/in-node-js) - 检查是否在 Node.js 中
