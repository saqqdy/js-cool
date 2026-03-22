# windowSize <Badge type="info" text="since v1.0.1" />

Get window dimensions.

## Usage

```js
import { windowSize } from 'js-cool'
```

## Signature

```typescript
function windowSize(): { width: number; height: number }
```

## Returns

`{ width: number, height: number }` - Window dimensions.

## Examples

```js
windowSize()
// { width: 1920, height: 1080 }

// Responsive check
const { width } = windowSize()
if (width < 768) {
  console.log('Mobile view')
}
```
