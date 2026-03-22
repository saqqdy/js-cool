# stopBubble

阻止事件冒泡。

## 用法

```js
import { stopBubble } from 'js-cool'
```

## 签名

```typescript
function stopBubble(e: Event): void
```

## 参数

| 参数 | 类型    | 描述     |
| ---- | ------- | -------- |
| `e`  | `Event` | 事件对象 |

## 示例

```js
document.getElementById('child').addEventListener('click', e => {
  stopBubble(e)
  console.log('事件不会冒泡到父元素')
})
```

## 相关

- [stopDefault](/api/dom/stop-default) - 阻止默认行为
