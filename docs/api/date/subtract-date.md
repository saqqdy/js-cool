# subtractDate <Badge type="info" text="since v6.0.0" />

Subtract time from a date.

## Usage

```js
import { subtractDate } from 'js-cool'
```

## Signature

```typescript
type DateUnit = 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond'

function subtractDate(date: Date | string | number, value: number, unit: DateUnit): Date
```

## Parameters

| Parameter | Type                       | Description            |
| --------- | -------------------------- | ---------------------- |
| `date`    | `Date \| string \| number` | The date to modify     |
| `value`   | `number`                   | The amount to subtract |
| `unit`    | `DateUnit`                 | The unit of time       |

## Returns

`Date` - A new Date object with the subtracted time.

## Examples

```js
subtractDate(new Date(), 1, 'day') // Yesterday
subtractDate(new Date(), 2, 'week') // 2 weeks ago
subtractDate(new Date(), 1, 'month') // 1 month ago
subtractDate(new Date(), 1, 'year') // 1 year ago
subtractDate(new Date(), 30, 'minute') // 30 minutes ago
subtractDate(new Date(), 2, 'hour') // 2 hours ago
```

## Related

- [addDate](./add-date.md) - Add time to a date
- [startOf](./start-of.md) - Get start of time period
- [endOf](./end-of.md) - Get end of time period
