# getWeekOfYear <Badge type="info" text="since v6.0.0" />

Get week of year (ISO week).

## Usage

```js
import { getWeekOfYear } from 'js-cool'
```

## Signature

```typescript
function getWeekOfYear(date: Date | string | number): number
```

## Parameters

| Parameter | Type                       | Description       |
| --------- | -------------------------- | ----------------- |
| `date`    | `Date \| string \| number` | The date to check |

## Returns

`number` - The ISO week number of the year (1-53).

## Examples

```js
getWeekOfYear('2024-01-01')
// => 1

getWeekOfYear('2024-01-15')
// => 3

getWeekOfYear('2024-12-31')
// => 1 (first week of next year)

getWeekOfYear(new Date())
// => current week number
```

## Related

- [getQuarter](./get-quarter.md) - Get quarter of year
- [getDayOfYear](./get-day-of-year.md) - Get day of year
- [getDaysInMonth](./get-days-in-month.md) - Get days in month
