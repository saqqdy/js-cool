# isLeapYear <Badge type="info" text="since v6.0.0" />

Check if year is a leap year.

## Usage

```js
import { isLeapYear } from 'js-cool'
```

## Signature

```typescript
function isLeapYear(year: number): boolean
```

## Parameters

| Parameter | Type     | Description     |
| --------- | -------- | --------------- |
| `year`    | `number` | The year to check |

## Returns

`boolean` - `true` if the year is a leap year, `false` otherwise.

## Examples

```js
isLeapYear(2024)
// => true

isLeapYear(2023)
// => false

isLeapYear(2000)
// => true (divisible by 400)

isLeapYear(1900)
// => false (divisible by 100 but not 400)
```

## Related

- [getDaysInMonth](./get-days-in-month.md) - Get days in month
- [isWeekend](./is-weekend.md) - Check if date is weekend
