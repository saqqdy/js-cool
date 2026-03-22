# nextIndex

获取下一个可用的 z-index 值。

## 用法

```js
import { nextIndex } from 'js-cool'
```

## 签名

```typescript
function nextIndex(min?: number, max?: number): number
```

## 参数

| 参数  | 类型     | 描述                        |
| ----- | -------- | --------------------------- |
| `min` | `number` | 最小 z-index（默认：5000）  |
| `max` | `number` | 最大 z-index（默认：10000） |

## 返回值

`number` - 下一个 z-index 值。

## 示例

```js
nextIndex() // 5001 或更高，基于现有元素计算
nextIndex(1000) // 1001 或更高
nextIndex(5000, 10000) // 5000 到 10000 之间

// 用于模态框/遮罩层
modal.style.zIndex = nextIndex()
```
