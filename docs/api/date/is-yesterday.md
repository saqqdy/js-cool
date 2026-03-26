# isYesterday <Badge type="info" text="since v6.0.0" />

Check if date is yesterday.

## Usage

```js
import { isYesterday } from 'js-cool'
```

## Signature

```typescript
function isYesterday(date: Date | string | number): boolean
```

## Parameters

| Parameter | Type                       | Description       |
| --------- | -------------------------- | ----------------- |
| `date`    | `Date \| string \| number` | The date to check |

## Returns

`boolean` - `true` if the date is yesterday, `false` otherwise.

## Examples

```js
const yesterday = new Date()
yesterday.setDate(yesterday.getDate() - 1)
isYesterday(yesterday)
// => true

isYesterday(new Date())
// => false

isYesterday('2024-01-14')
// => false (if today is not 2024-01-15)
```

## Related

- [isToday](./is-today.md) - Check if date is today
- [isTomorrow](./is-tomorrow.md) - Check if date is tomorrow
- [isWeekend](./is-weekend.md) - Check if date is weekend
