# getDaysInMonth

Get the number of days in a month.

## Usage

```js
import { getDaysInMonth } from 'js-cool'
```

## Signature

```typescript
function getDaysInMonth(year: number, month: number): number
```

## Parameters

| Parameter | Type     | Description                          |
| --------- | -------- | ------------------------------------ |
| `year`    | `number` | The year                             |
| `month`   | `number` | The month (0-11, where 0 is January) |

## Returns

`number` - The number of days in the specified month.

## Examples

```js
getDaysInMonth(2024, 0) // January 2024
// => 31

getDaysInMonth(2024, 1) // February 2024 (leap year)
// => 29

getDaysInMonth(2023, 1) // February 2023
// => 28

getDaysInMonth(2024, 3) // April 2024
// => 30

getDaysInMonth(2024, 11) // December 2024
// => 31
```

## Related

- [isToday](./is-today.md) - Check if date is today
- [formatDate](./format-date.md) - Format date to string
- [dateDiff](./date-diff.md) - Calculate date difference
