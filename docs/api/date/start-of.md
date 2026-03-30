# startOf <Badge type="info" text="since v6.0.0" />

Get start of time period.

## Usage

```js
import { startOf } from 'js-cool'
```

## Signature

```typescript
type DateUnit = 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond'

function startOf(date: Date | string | number, unit: DateUnit): Date
```

## Parameters

| Parameter | Type                       | Description        |
| --------- | -------------------------- | ------------------ |
| `date`    | `Date \| string \| number` | The date to modify |
| `unit`    | `DateUnit`                 | The unit of time   |

## Returns

`Date` - A new Date object set to the start of the specified time period.

## Examples

```js
startOf(new Date(), 'day') // Today at 00:00:00
startOf(new Date(), 'week') // This Sunday at 00:00:00
startOf(new Date(), 'month') // First day of month at 00:00:00
startOf(new Date(), 'year') // January 1st at 00:00:00
startOf(new Date(), 'hour') // Current hour at 00:00
startOf(new Date(), 'minute') // Current minute at 00 seconds
```

## Related

- [endOf](./end-of.md) - Get end of time period
- [addDate](./add-date.md) - Add time to a date
- [subtractDate](./subtract-date.md) - Subtract time from a date
