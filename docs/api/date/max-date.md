# maxDate <Badge type="info" text="since v6.0.0" />

Get the maximum (latest) date from a list.

## Usage

```js
import { maxDate } from 'js-cool'
```

## Signature

```typescript
function maxDate(...dates: (Date | string | number)[]): Date
```

## Parameters

| Parameter | Type                                       | Description          |
| --------- | ------------------------------------------ | -------------------- |
| `...dates`| `(Date \| string \| number)[]`             | List of dates        |

## Returns

`Date` - The latest date from the list. Returns current date if all dates are invalid.

## Examples

```js
maxDate('2024-01-01', '2024-01-03', '2024-01-02')
// => Date object for 2024-01-03

maxDate(new Date('2024-01-01'), new Date('2024-01-02'))
// => Date object for 2024-01-02

maxDate('2024-06-01', '2024-01-15', '2024-12-31')
// => Date object for 2024-12-31
```

## Related

- [minDate](./min-date.md) - Get minimum date
- [compareDate](./compare-date.md) - Compare two dates
