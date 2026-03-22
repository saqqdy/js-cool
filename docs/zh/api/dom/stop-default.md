# stopDefault <Badge type="info" text="v1.0.2" />

阻止事件的默认行为。

## 用法

```js
import { stopDefault } from 'js-cool'
```

## 签名

```typescript
function stopDefault(e: Event): boolean
```

## 参数

| 参数 | 类型    | 描述     |
| ---- | ------- | -------- |
| `e`  | `Event` | 事件对象 |

## 返回值

`boolean` - 始终返回 `false`。

## 示例

```js
// 阻止表单提交
document.querySelector('form').addEventListener('submit', e => {
  stopDefault(e)
  console.log('表单提交已被阻止')
})

// 阻止链接导航
document.querySelector('a').addEventListener('click', e => {
  stopDefault(e)
})
```

## 相关

- [stopBubble](/api/dom/stop-bubble) - 阻止事件冒泡
