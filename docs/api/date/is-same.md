# isSame <Badge type="info" text="since v6.0.0" />

Check if two dates are the same by specified unit.

## Usage

```js
import { isSame } from 'js-cool'
```

## Signature

```typescript
type DateComparisonUnit = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second'

function isSame(
  date1: Date | string | number,
  date2: Date | string | number,
  unit?: DateComparisonUnit
): boolean
```

## Parameters

| Parameter | Type                       | Description                                |
| --------- | -------------------------- | ------------------------------------------ |
| `date1`   | `Date \| string \| number` | The first date                             |
| `date2`   | `Date \| string \| number` | The second date                            |
| `unit`    | `DateComparisonUnit`       | Comparison unit (default: `'day'`)         |

## Returns

`boolean` - `true` if the dates are the same by the specified unit, `false` otherwise.

## Examples

```js
isSame(new Date(), new Date(), 'day')
// => true

isSame('2024-01-01', '2024-01-02', 'month')
// => true (same month)

isSame('2024-01-01', '2024-02-01', 'year')
// => true (same year)

isSame('2024-01-01 10:00', '2024-01-01 11:00', 'day')
// => true (same day)

isSame('2024-01-01 10:00', '2024-01-01 11:00', 'hour')
// => false (different hour)
```

## Related

- [isBefore](./is-before.md) - Check if date is before another
- [isAfter](./is-after.md) - Check if date is after another
- [isBetween](./is-between.md) - Check if date is between two dates
