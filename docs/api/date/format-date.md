# formatDate <Badge type="info" text="since v6.0.0" />

Format date to string with customizable format tokens.

## Usage

```js
import { formatDate } from 'js-cool'
```

## Signature

```typescript
function formatDate(date: Date | string | number, format?: string): string
```

## Parameters

| Parameter | Type                       | Description                                          |
| --------- | -------------------------- | ---------------------------------------------------- |
| `date`    | `Date \| string \| number` | The date to format                                   |
| `format`  | `string`                   | The format string (default: `'YYYY-MM-DD HH:mm:ss'`) |

## Returns

`string` - The formatted date string. Returns empty string if the date is invalid.

## Format Tokens

| Token  | Description                    | Example |
| ------ | ------------------------------ | ------- |
| `YYYY` | 4-digit year                   | `2024`  |
| `YY`   | 2-digit year                   | `24`    |
| `MM`   | 2-digit month (01-12)          | `01`    |
| `M`    | Month (1-12)                   | `1`     |
| `DD`   | 2-digit day of month (01-31)   | `15`    |
| `D`    | Day of month (1-31)            | `15`    |
| `HH`   | 2-digit hour 24-format (00-23) | `14`    |
| `H`    | Hour 24-format (0-23)          | `14`    |
| `hh`   | 2-digit hour 12-format (01-12) | `02`    |
| `h`    | Hour 12-format (1-12)          | `2`     |
| `mm`   | 2-digit minute (00-59)         | `30`    |
| `m`    | Minute (0-59)                  | `30`    |
| `ss`   | 2-digit second (00-59)         | `45`    |
| `s`    | Second (0-59)                  | `45`    |
| `SSS`  | 3-digit millisecond (000-999)  | `123`   |
| `A`    | AM/PM uppercase                | `PM`    |
| `a`    | am/pm lowercase                | `pm`    |

## Examples

```js
formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
// => '2024-01-15 10:30:45'

formatDate(new Date(), 'YYYY/MM/DD')
// => '2024/01/15'

formatDate(new Date('2024-01-15'), 'YYYY年MM月DD日')
// => '2024年01月15日'

formatDate(new Date('2024-01-15 14:30:45'), 'hh:mm A')
// => '02:30 PM'
```

## Related

- [dateDiff](./date-diff.md) - Calculate date difference
- [relativeTime](./relative-time.md) - Get relative time string
- [isToday](./is-today.md) - Check if date is today
