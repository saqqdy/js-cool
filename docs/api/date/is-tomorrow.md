# isTomorrow <Badge type="info" text="since v6.0.0" />

Check if date is tomorrow.

## Usage

```js
import { isTomorrow } from 'js-cool'
```

## Signature

```typescript
function isTomorrow(date: Date | string | number): boolean
```

## Parameters

| Parameter | Type                       | Description       |
| --------- | -------------------------- | ----------------- |
| `date`    | `Date \| string \| number` | The date to check |

## Returns

`boolean` - `true` if the date is tomorrow, `false` otherwise.

## Examples

```js
const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)
isTomorrow(tomorrow)
// => true

isTomorrow(new Date())
// => false

isTomorrow('2024-01-16')
// => false (if today is not 2024-01-15)
```

## Related

- [isToday](./is-today.md) - Check if date is today
- [isYesterday](./is-yesterday.md) - Check if date is yesterday
- [isWeekend](./is-weekend.md) - Check if date is weekend
