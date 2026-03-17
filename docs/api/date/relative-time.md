# relativeTime

Get relative time string (e.g., "3 minutes ago", "in 2 hours").

## Usage

```js
import { relativeTime } from 'js-cool'
```

## Signature

```typescript
function relativeTime(date: Date | string | number, now?: Date, locale?: string): string
```

## Parameters

| Parameter | Type                       | Description                           |
| --------- | -------------------------- | ------------------------------------- |
| `date`    | `Date \| string \| number` | The date to compare                   |
| `now`     | `Date`                     | The current date (default: `new Date()`) |
| `locale`  | `string`                   | The locale string (default: `'en'`)   |

## Returns

`string` - The relative time string. Returns empty string if the date is invalid.

## Supported Locales

| Locale | Code  | Example Output              |
| ------ | ----- | --------------------------- |
| English| `en`  | "5 minutes ago"             |
| Chinese| `zh`  | "5分钟前"                    |

## Examples

```js
relativeTime(new Date(Date.now() - 1000 * 60 * 5))
// => '5 minutes ago'

relativeTime(new Date(Date.now() + 1000 * 60 * 60 * 2))
// => 'in 2 hours'

relativeTime(new Date(Date.now() - 1000 * 60 * 60 * 24 * 7))
// => '7 days ago'

relativeTime(new Date(Date.now() - 1000 * 60 * 3), new Date(), 'zh')
// => '3分钟前'

relativeTime(new Date())
// => 'just now'
```

## Related

- [formatDate](./format-date.md) - Format date to string
- [dateDiff](./date-diff.md) - Calculate date difference
- [isToday](./is-today.md) - Check if date is today
