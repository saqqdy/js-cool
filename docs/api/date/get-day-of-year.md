# getDayOfYear <Badge type="info" text="since v6.0.0" />

Get day of year (1-366).

## Usage

```js
import { getDayOfYear } from 'js-cool'
```

## Signature

```typescript
function getDayOfYear(date: Date | string | number): number
```

## Parameters

| Parameter | Type                       | Description       |
| --------- | -------------------------- | ----------------- |
| `date`    | `Date \| string \| number` | The date to check |

## Returns

`number` - The day of the year (1-366).

## Examples

```js
getDayOfYear('2024-01-01')
// => 1

getDayOfYear('2024-02-01')
// => 32

getDayOfYear('2024-12-31')
// => 366 (leap year)

getDayOfYear('2023-12-31')
// => 365 (non-leap year)

getDayOfYear(new Date())
// => current day of year
```

## Related

- [getQuarter](./get-quarter.md) - Get quarter of year
- [getWeekOfYear](./get-week-of-year.md) - Get week of year
- [getDaysInMonth](./get-days-in-month.md) - Get days in month
