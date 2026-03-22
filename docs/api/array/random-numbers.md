# randomNumbers

Generate an array of random numbers.

## Usage

```js
import { randomNumbers } from 'js-cool'
```

## Signature

```typescript
function randomNumbers(count: number, min?: number, max?: number): number[]
```

## Parameters

| Parameter | Type     | Description                  |
| --------- | -------- | ---------------------------- |
| `count`   | `number` | Number of random numbers     |
| `min`     | `number` | Minimum value (default: 0)   |
| `max`     | `number` | Maximum value (default: 100) |

## Returns

`number[]` - Array of random numbers.

## Examples

```js
randomNumbers(5) // [42, 17, 83, 5, 91] (0-100)
randomNumbers(3, 1, 10) // [7, 2, 9] (1-10)
```
