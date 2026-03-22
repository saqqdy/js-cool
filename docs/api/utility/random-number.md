# randomNumber

Generate a random number in range.

## Usage

```js
import { randomNumber } from 'js-cool'
```

## Signature

```typescript
function randomNumber(min?: number, max?: number): number
```

## Parameters

| Parameter | Type     | Description                  |
| --------- | -------- | ---------------------------- |
| `min`     | `number` | Minimum value (default: 0)   |
| `max`     | `number` | Maximum value (default: 100) |

## Returns

`number` - Random number in range.

## Examples

```js
randomNumber() // 0-100
randomNumber(1, 10) // 1-10
randomNumber(0, 1) // 0 or 1
```
