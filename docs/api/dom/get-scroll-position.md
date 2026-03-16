# getScrollPosition

Get current scroll position.

## Usage

```js
import { getScrollPosition } from 'js-cool'
```

## Signature

```typescript
function getScrollPosition(): { x: number, y: number }
```

## Returns

`{ x: number, y: number }` - Scroll position object.

## Examples

```js
getScrollPosition()
// { x: 0, y: 100 }

// Scroll to top when past threshold
const { y } = getScrollPosition()
if (y > 500) {
  window.scrollTo(0, 0)
}
```
