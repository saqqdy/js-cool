# compareDate <Badge type="info" text="since v6.0.0" />

Compare two dates.

## Usage

```js
import { compareDate } from 'js-cool'
```

## Signature

```typescript
function compareDate(date1: Date | string | number, date2: Date | string | number): -1 | 0 | 1
```

## Parameters

| Parameter | Type                       | Description     |
| --------- | -------------------------- | --------------- |
| `date1`   | `Date \| string \| number` | The first date  |
| `date2`   | `Date \| string \| number` | The second date |

## Returns

`-1 | 0 | 1` - Returns `-1` if date1 < date2, `0` if equal, `1` if date1 > date2. Returns `0` if either date is invalid.

## Examples

```js
compareDate('2024-01-01', '2024-01-02')
// => -1 (first is earlier)

compareDate('2024-01-02', '2024-01-01')
// => 1 (first is later)

compareDate('2024-01-01', '2024-01-01')
// => 0 (equal)
```

## Related

- [isBefore](./is-before.md) - Check if date is before another
- [isAfter](./is-after.md) - Check if date is after another
- [minDate](./min-date.md) - Get minimum date
- [maxDate](./max-date.md) - Get maximum date
