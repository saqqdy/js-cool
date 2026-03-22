# clamp

Clamps number within the inclusive lower and upper bounds.

## Usage

```js
import { clamp } from 'js-cool'
```

## Signature

```typescript
function clamp(number: number, lower: number, upper?: number): number
```

## Parameters

| Parameter | Type     | Description                                                             |
| --------- | -------- | ----------------------------------------------------------------------- |
| `number`  | `number` | The number to clamp                                                     |
| `lower`   | `number` | The lower bound                                                         |
| `upper`   | `number` | The upper bound (optional, defaults to `lower` with `lower` set to `0`) |

## Returns

`number` - The clamped number.

## Examples

```js
clamp(-10, -5, 5) // -5
clamp(10, -5, 5) // 5
clamp(3, -5, 5) // 3
clamp(10, 5) // 5 (lower is 0, upper is 5)
clamp(3, 5) // 3 (lower is 0, upper is 5)
```

## Related

- [inRange](/api/number/in-range) - Check if number is in range
