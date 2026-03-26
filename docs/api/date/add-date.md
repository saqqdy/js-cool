# addDate <Badge type="info" text="since v6.0.0" />

Add time to a date.

## Usage

```js
import { addDate } from 'js-cool'
```

## Signature

```typescript
type DateUnit = 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond'

function addDate(date: Date | string | number, value: number, unit: DateUnit): Date
```

## Parameters

| Parameter | Type                       | Description        |
| --------- | -------------------------- | ------------------ |
| `date`    | `Date \| string \| number` | The date to modify |
| `value`   | `number`                   | The amount to add  |
| `unit`    | `DateUnit`                 | The unit of time   |

## Returns

`Date` - A new Date object with the added time.

## Examples

```js
addDate(new Date(), 1, 'day') // Tomorrow
addDate(new Date(), 2, 'week') // 2 weeks from now
addDate(new Date(), 1, 'month') // 1 month from now
addDate(new Date(), 1, 'year') // 1 year from now
addDate(new Date(), 30, 'minute') // 30 minutes from now
addDate(new Date(), 2, 'hour') // 2 hours from now
```

## Related

- [subtractDate](./subtract-date.md) - Subtract time from a date
- [startOf](./start-of.md) - Get start of time period
- [endOf](./end-of.md) - Get end of time period
