# removeEvent

移除事件监听器。

## 用法

```js
import { removeEvent } from 'js-cool'
```

## 签名

```typescript
function removeEvent(element: any, type: string, handler: Function): void
```

## 参数

| 参数      | 类型       | 描述                 |
| --------- | ---------- | -------------------- |
| `element` | `any`      | DOM 元素             |
| `type`    | `string`   | 事件类型（不含'on'） |
| `handler` | `Function` | 事件处理函数         |

## 示例

```js
const handler = e => console.log('已点击')
addEvent(btn, 'click', handler)

// 之后，移除处理函数
removeEvent(btn, 'click', handler)
```

## 相关

- [addEvent](/api/dom/add-event) - 添加事件监听器
