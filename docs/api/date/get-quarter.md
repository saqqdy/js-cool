# getQuarter <Badge type="info" text="since v6.0.0" />

Get quarter of year (1-4).

## Usage

```js
import { getQuarter } from 'js-cool'
```

## Signature

```typescript
function getQuarter(date: Date | string | number): number
```

## Parameters

| Parameter | Type                       | Description       |
| --------- | -------------------------- | ----------------- |
| `date`    | `Date \| string \| number` | The date to check |

## Returns

`number` - The quarter of the year (1-4).

## Examples

```js
getQuarter('2024-01-15')
// => 1

getQuarter('2024-04-15')
// => 2

getQuarter('2024-07-15')
// => 3

getQuarter('2024-10-15')
// => 4

getQuarter(new Date())
// => current quarter
```

## Related

- [getDaysInMonth](./get-days-in-month.md) - Get days in month
- [getWeekOfYear](./get-week-of-year.md) - Get week of year
- [getDayOfYear](./get-day-of-year.md) - Get day of year
