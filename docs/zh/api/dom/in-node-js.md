# inNodeJs <Badge type="info" text="v5.13.0" />

检查是否在 Node.js 环境中运行。

## 用法

```js
import { inNodeJs } from 'js-cool'
```

## 签名

```typescript
const inNodeJs: boolean
```

## 返回值

`boolean` - 如果在 Node.js 中则为 `true`。

## 示例

```js
if (inNodeJs) {
  console.log('在 Node.js 中运行')
  // 使用 Node.js API
}
```

## 相关

- [inBrowser](/api/dom/in-browser) - 检查是否在浏览器中
