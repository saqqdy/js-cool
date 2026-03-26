# endOf <Badge type="info" text="since v6.0.0" />

Get end of time period.

## Usage

```js
import { endOf } from 'js-cool'
```

## Signature

```typescript
type DateUnit = 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond'

function endOf(date: Date | string | number, unit: DateUnit): Date
```

## Parameters

| Parameter | Type                       | Description          |
| --------- | -------------------------- | -------------------- |
| `date`    | `Date \| string \| number` | The date to modify   |
| `unit`    | `DateUnit`                 | The unit of time     |

## Returns

`Date` - A new Date object set to the end of the specified time period.

## Examples

```js
endOf(new Date(), 'day')      // Today at 23:59:59.999
endOf(new Date(), 'week')     // This Saturday at 23:59:59.999
endOf(new Date(), 'month')    // Last day of month at 23:59:59.999
endOf(new Date(), 'year')     // December 31st at 23:59:59.999
endOf(new Date(), 'hour')     // Current hour at 59:59.999
endOf(new Date(), 'minute')   // Current minute at 59.999 seconds
```

## Related

- [startOf](./start-of.md) - Get start of time period
- [add](./add.md) - Add time to a date
- [subtract](./subtract.md) - Subtract time from a date
