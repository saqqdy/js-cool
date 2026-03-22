# round <Badge type="info" text="since v6.0.0" />

Computes number rounded to precision.

## Usage

```js
import { round } from 'js-cool'
```

## Signature

```typescript
function round(number: number, precision?: number): number
```

## Parameters

| Parameter   | Type     | Description                              |
| ----------- | -------- | ---------------------------------------- |
| `number`    | `number` | The number to round                      |
| `precision` | `number` | The precision to round to (default: `0`) |

## Returns

`number` - The rounded number.

## Examples

```js
round(4.006) // 4
round(4.006, 2) // 4.01
round(4060, -2) // 4100
round(4.5) // 5
round(4.4) // 4
```

## Notes

- Positive precision rounds to decimal places
- Negative precision rounds to tens, hundreds, etc.
- Uses `Math.round` internally with floating-point correction

## Related

- [sum](/api/number/sum) - Sum of array
- [average](/api/number/average) - Average of array
