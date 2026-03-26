# minDate <Badge type="info" text="since v6.0.0" />

Get the minimum (earliest) date from a list.

## Usage

```js
import { minDate } from 'js-cool'
```

## Signature

```typescript
function minDate(...dates: (Date | string | number)[]): Date
```

## Parameters

| Parameter  | Type                           | Description   |
| ---------- | ------------------------------ | ------------- |
| `...dates` | `(Date \| string \| number)[]` | List of dates |

## Returns

`Date` - The earliest date from the list. Returns current date if all dates are invalid.

## Examples

```js
minDate('2024-01-03', '2024-01-01', '2024-01-02')
// => Date object for 2024-01-01

minDate(new Date('2024-01-01'), new Date('2024-01-02'))
// => Date object for 2024-01-01

minDate('2024-06-01', '2024-01-15', '2024-12-31')
// => Date object for 2024-01-15
```

## Related

- [maxDate](./max-date.md) - Get maximum date
- [compareDate](./compare-date.md) - Compare two dates
