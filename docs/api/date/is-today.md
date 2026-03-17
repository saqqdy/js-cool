# isToday

Check if date is today.

## Usage

```js
import { isToday } from 'js-cool'
```

## Signature

```typescript
function isToday(date: Date | string | number): boolean
```

## Parameters

| Parameter | Type                       | Description       |
| --------- | -------------------------- | ----------------- |
| `date`    | `Date \| string \| number` | The date to check |

## Returns

`boolean` - `true` if the date is today, `false` otherwise.

## Examples

```js
isToday(new Date())
// => true

isToday(new Date('2020-01-01'))
// => false (if today is not 2020-01-01)

isToday(Date.now())
// => true

isToday('2024-01-15')
// => false (if today is not 2024-01-15)
```

## Related

- [formatDate](./format-date.md) - Format date to string
- [dateDiff](./date-diff.md) - Calculate date difference
- [relativeTime](./relative-time.md) - Get relative time string
