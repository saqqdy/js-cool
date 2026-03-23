# scroll <Badge type="info" text="since v6.0.0" />

滚动工具集合，用于处理滚动相关操作。

## 使用

```js
import { scroll } from 'js-cool'
// 或
import scrollUtils from 'js-cool/scroll'
```

## 方法

### getPosition()

获取滚动位置状态。

```typescript
function getPosition(el?: Window | Element, threshold?: number): 'top' | 'bottom' | undefined
```

**参数：**

- `el` - 目标元素，默认为 `window`
- `threshold` - 底部检测阈值（默认：1px）

**返回值：** `'top'` | `'bottom'` | `undefined`

```js
const pos = scroll.getPosition()
if (pos === 'bottom') {
  loadMore()
}
```

---

### getProgress()

获取滚动进度百分比。

```typescript
function getProgress(el?: Window | Element): number
```

**返回值：** `0` - `100`

```js
const progress = scroll.getProgress()
progressBar.style.width = `${progress}%`
```

---

### createDirectionTracker()

创建滚动方向追踪器。

```typescript
function createDirectionTracker(): () => 'up' | 'down' | null
```

**返回值：** 追踪函数

```js
const tracker = scroll.createDirectionTracker()

window.addEventListener(
  'scroll',
  throttle(() => {
    const dir = tracker() // 'up' | 'down' | null
    if (dir === 'down') header.classList.add('hidden')
    else if (dir === 'up') header.classList.remove('hidden')
  }, 100)
)
```

---

### isInViewport()

检测元素是否在视口内。

```typescript
function isInViewport(
  el: Element,
  options?: { fully?: boolean; offset?: number }
): boolean | 'partial'
```

**参数：**

- `el` - 目标元素
- `options.fully` - 是否检测完全可见（默认：`true`）
- `options.offset` - 距离视口边缘的偏移量（默认：`0`）

```js
const el = document.getElementById('box')
if (scroll.isInViewport(el)) {
  // 元素完全可见
}
```

---

### scrollTo()

滚动到元素或位置。

```typescript
function scrollTo(
  target: Element | string,
  options?: { offset?: number; behavior?: 'smooth' | 'auto' }
): void
```

```js
scroll.scrollTo('#section-2')
scroll.scrollTo('#header', { offset: -80 })
scroll.scrollTo(document.getElementById('box'))
```

---

### scrollToTop()

滚动到页面顶部。

```typescript
function scrollToTop(options?: { behavior?: 'smooth' | 'auto' }): void
```

```js
scroll.scrollToTop()
scroll.scrollToTop({ behavior: 'auto' }) // 立即滚动
```

---

### scrollToBottom()

滚动到页面底部。

```typescript
function scrollToBottom(options?: { behavior?: 'smooth' | 'auto' }): void
```

```js
scroll.scrollToBottom()
```

---

### scrollBy()

按指定量滚动。

```typescript
function scrollBy(amount: number, options?: { behavior?: 'smooth' | 'auto' }): void
```

```js
scroll.scrollBy(200) // 向下滚动 200px
scroll.scrollBy(-100) // 向上滚动 100px
```

---

### lock() / unlock()

锁定和解锁滚动（适用于弹窗场景）。

```js
// 弹窗打开时锁定滚动
scroll.lock()

// 弹窗关闭时解锁滚动
scroll.unlock()
```

---

### toggle()

切换滚动锁定状态。

```js
scroll.toggle() // 未锁定则锁定，已锁定则解锁
```

---

### isLocked()

检查滚动是否已锁定。

```typescript
function isLocked(): boolean
```

```js
if (scroll.isLocked()) {
  console.log('滚动已锁定')
}
```

---

### getScrollbarWidth()

获取滚动条宽度（像素）。

```typescript
function getScrollbarWidth(): number
```

```js
const width = scroll.getScrollbarWidth() // 例如：15
```
