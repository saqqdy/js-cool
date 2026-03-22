# dateDiff

Calculate the difference between two dates.

## Usage

```js
import { dateDiff } from 'js-cool'
```

## Signature

```typescript
interface DateDiffResult {
  days: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
  total: {
    days: number
    hours: number
    minutes: number
    seconds: number
    milliseconds: number
  }
}

function dateDiff(date1: Date | string | number, date2: Date | string | number): DateDiffResult
```

## Parameters

| Parameter | Type                       | Description     |
| --------- | -------------------------- | --------------- |
| `date1`   | `Date \| string \| number` | The first date  |
| `date2`   | `Date \| string \| number` | The second date |

## Returns

`DateDiffResult` - An object containing the difference between the two dates with the following properties:

| Property             | Type     | Description                      |
| -------------------- | -------- | -------------------------------- |
| `days`               | `number` | Whole days in the difference     |
| `hours`              | `number` | Remaining hours (0-23)           |
| `minutes`            | `number` | Remaining minutes (0-59)         |
| `seconds`            | `number` | Remaining seconds (0-59)         |
| `milliseconds`       | `number` | Remaining milliseconds (0-999)   |
| `total.days`         | `number` | Total difference in days         |
| `total.hours`        | `number` | Total difference in hours        |
| `total.minutes`      | `number` | Total difference in minutes      |
| `total.seconds`      | `number` | Total difference in seconds      |
| `total.milliseconds` | `number` | Total difference in milliseconds |

Returns zero values for all properties if either date is invalid.

## Examples

```js
const diff = dateDiff('2024-01-01', '2024-01-03')
// => { days: 2, hours: 0, minutes: 0, seconds: 0, milliseconds: 0, total: { days: 2, hours: 48, minutes: 2880, seconds: 172800, milliseconds: 172800000 } }

const diff = dateDiff(new Date('2024-01-01'), new Date('2024-01-02 12:30:00'))
// => { days: 1, hours: 12, minutes: 30, seconds: 0, milliseconds: 0, ... }

const diff = dateDiff('2024-01-01 10:00:00', '2024-01-01 12:30:45')
// => { days: 0, hours: 2, minutes: 30, seconds: 45, milliseconds: 0, ... }
```

## Related

- [formatDate](./format-date.md) - Format date to string
- [relativeTime](./relative-time.md) - Get relative time string
- [isToday](./is-today.md) - Check if date is today
