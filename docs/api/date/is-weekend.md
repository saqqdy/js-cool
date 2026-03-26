# isWeekend <Badge type="info" text="since v6.0.0" />

Check if date is weekend (Saturday or Sunday).

## Usage

```js
import { isWeekend } from 'js-cool'
```

## Signature

```typescript
function isWeekend(date: Date | string | number): boolean
```

## Parameters

| Parameter | Type                       | Description       |
| --------- | -------------------------- | ----------------- |
| `date`    | `Date \| string \| number` | The date to check |

## Returns

`boolean` - `true` if the date is Saturday or Sunday, `false` otherwise.

## Examples

```js
isWeekend(new Date('2024-01-06'))
// => true (Saturday)

isWeekend(new Date('2024-01-07'))
// => true (Sunday)

isWeekend(new Date('2024-01-08'))
// => false (Monday)

isWeekend('2024-01-20')
// => true (Saturday)
```

## Related

- [isToday](./is-today.md) - Check if date is today
- [isLeapYear](./is-leap-year.md) - Check if year is leap year
