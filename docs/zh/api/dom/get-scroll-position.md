# getScrollPosition

获取当前滚动位置。

## 用法

```js
import { getScrollPosition } from 'js-cool'
```

## 签名

```typescript
function getScrollPosition(): { x: number, y: number }
```

## 返回值

`{ x: number, y: number }` - 滚动位置对象。

## 示例

```js
getScrollPosition()
// { x: 0, y: 100 }

// 超过阈值时滚动到顶部
const { y } = getScrollPosition()
if (y > 500) {
  window.scrollTo(0, 0)
}
```
