# nextIndex <Badge type="info" text="since v1.0.2" />

Get the next available z-index value.

## Usage

```js
import { nextIndex } from 'js-cool'
```

## Signature

```typescript
function nextIndex(min?: number, max?: number): number
```

## Parameters

| Parameter | Type     | Description                      |
| --------- | -------- | -------------------------------- |
| `min`     | `number` | Minimum z-index (default: 5000)  |
| `max`     | `number` | Maximum z-index (default: 10000) |

## Returns

`number` - Next z-index value.

## Examples

```js
nextIndex() // 5001 or higher based on existing elements
nextIndex(1000) // 1001 or higher
nextIndex(5000, 10000) // Between 5000-10000

// Use for modal/overlay
modal.style.zIndex = nextIndex()
```
