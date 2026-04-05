# randomNumber <Badge type="info" text="since v5.0.0" />

Generate a random integer in range with uniform distribution.

## Usage

```js
import { randomNumber } from 'js-cool'
```

## Signature

```typescript
function randomNumber(min?: number, max?: number): number
```

## Parameters

| Parameter | Type     | Description                               |
| --------- | -------- | ----------------------------------------- |
| `min`     | `number` | Minimum value, inclusive (default: 1)     |
| `max`     | `number` | Maximum value, inclusive (default: 10)    |

## Returns

`number` - Random integer between min and max (inclusive).

## Examples

```js
// Default range (1-10)
randomNumber() // 8

// Custom range
randomNumber(1, 100) // 42

// Small range
randomNumber(1, 3) // 2

// Single value range
randomNumber(5, 5) // 5
```

## Notes

Uses `Math.floor()` for uniform distribution across all values in the range.
