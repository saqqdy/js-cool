# scroll <Badge type="info" text="since v6.0.0" />

Scroll utilities collection for handling scroll-related operations.

## Usage

```js
import { scroll } from 'js-cool'
// or
import scrollUtils from 'js-cool/scroll'
```

## Methods

### getPosition()

Get scroll position state.

```typescript
function getPosition(el?: Window | Element, threshold?: number): 'top' | 'bottom' | undefined
```

**Parameters:**
- `el` - Target element, defaults to `window`
- `threshold` - Threshold for bottom detection (default: 1px)

**Returns:** `'top'` | `'bottom'` | `undefined`

```js
const pos = scroll.getPosition()
if (pos === 'bottom') {
  loadMore()
}
```

---

### getProgress()

Get scroll progress as percentage.

```typescript
function getProgress(el?: Window | Element): number
```

**Returns:** `0` - `100`

```js
const progress = scroll.getProgress()
progressBar.style.width = `${progress}%`
```

---

### createDirectionTracker()

Create a scroll direction tracker.

```typescript
function createDirectionTracker(): () => 'up' | 'down' | null
```

**Returns:** Tracker function

```js
const tracker = scroll.createDirectionTracker()

window.addEventListener('scroll', throttle(() => {
  const dir = tracker() // 'up' | 'down' | null
  if (dir === 'down') header.classList.add('hidden')
  else if (dir === 'up') header.classList.remove('hidden')
}, 100))
```

---

### isInViewport()

Check if element is in viewport.

```typescript
function isInViewport(el: Element, options?: { fully?: boolean; offset?: number }): boolean | 'partial'
```

**Parameters:**
- `el` - Target element
- `options.fully` - Check if fully in viewport (default: `true`)
- `options.offset` - Offset from viewport edges (default: `0`)

```js
const el = document.getElementById('box')
if (scroll.isInViewport(el)) {
  // Element is fully visible
}
```

---

### scrollTo()

Scroll to element or position.

```typescript
function scrollTo(target: Element | string, options?: { offset?: number; behavior?: 'smooth' | 'auto' }): void
```

```js
scroll.scrollTo('#section-2')
scroll.scrollTo('#header', { offset: -80 })
scroll.scrollTo(document.getElementById('box'))
```

---

### scrollToTop()

Scroll to top of page.

```typescript
function scrollToTop(options?: { behavior?: 'smooth' | 'auto' }): void
```

```js
scroll.scrollToTop()
scroll.scrollToTop({ behavior: 'auto' }) // instant
```

---

### scrollToBottom()

Scroll to bottom of page.

```typescript
function scrollToBottom(options?: { behavior?: 'smooth' | 'auto' }): void
```

```js
scroll.scrollToBottom()
```

---

### scrollBy()

Scroll by amount.

```typescript
function scrollBy(amount: number, options?: { behavior?: 'smooth' | 'auto' }): void
```

```js
scroll.scrollBy(200)  // scroll down 200px
scroll.scrollBy(-100) // scroll up 100px
```

---

### lock() / unlock()

Lock and unlock scroll (useful for modals).

```js
// Lock scroll when modal opens
scroll.lock()

// Unlock when modal closes
scroll.unlock()
```

---

### toggle()

Toggle scroll lock state.

```js
scroll.toggle() // lock if unlocked, unlock if locked
```

---

### isLocked()

Check if scroll is locked.

```typescript
function isLocked(): boolean
```

```js
if (scroll.isLocked()) {
  console.log('Scroll is locked')
}
```

---

### getScrollbarWidth()

Get scrollbar width in pixels.

```typescript
function getScrollbarWidth(): number
```

```js
const width = scroll.getScrollbarWidth() // e.g., 15
```
