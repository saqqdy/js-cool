# isDarkMode

检查是否启用了深色模式。

## 用法

```js
import { isDarkMode } from 'js-cool'
```

## 签名

```typescript
function isDarkMode(): boolean
```

## 返回值

`boolean` - 如果深色模式已启用则为 `true`。

## 示例

```js
if (isDarkMode()) {
  console.log('深色模式已激活')
  document.body.classList.add('dark')
}
```
