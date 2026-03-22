# addEvent <Badge type="info" text="v1.0.2" />

添加事件监听器（跨浏览器兼容）。

## 用法

```js
import { addEvent } from 'js-cool'
```

## 签名

```typescript
function addEvent(element: any, type: string, handler: Function): void
```

## 参数

| 参数      | 类型       | 描述                 |
| --------- | ---------- | -------------------- |
| `element` | `any`      | DOM 元素             |
| `type`    | `string`   | 事件类型（不含'on'） |
| `handler` | `Function` | 事件处理函数         |

## 示例

```js
const btn = document.getElementById('btn')
addEvent(btn, 'click', e => {
  console.log('按钮被点击了！')
})

// 多个事件
addEvent(input, 'focus', onFocus)
addEvent(input, 'blur', onBlur)
```

## 相关

- [removeEvent](/api/dom/remove-event) - 移除事件监听器
