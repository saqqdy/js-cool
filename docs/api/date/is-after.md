# isAfter <Badge type="info" text="since v6.0.0" />

Check if date1 is after date2.

## Usage

```js
import { isAfter } from 'js-cool'
```

## Signature

```typescript
function isAfter(date1: Date | string | number, date2: Date | string | number): boolean
```

## Parameters

| Parameter | Type                       | Description     |
| --------- | -------------------------- | --------------- |
| `date1`   | `Date \| string \| number` | The first date  |
| `date2`   | `Date \| string \| number` | The second date |

## Returns

`boolean` - `true` if date1 is after date2, `false` otherwise. Returns `false` if either date is invalid.

## Examples

```js
isAfter('2024-01-02', '2024-01-01')
// => true

isAfter(new Date('2024-01-01'), '2024-01-02')
// => false

isAfter('2024-01-01', '2024-01-01')
// => false (same time)
```

## Related

- [isBefore](./is-before.md) - Check if date is before another
- [isSame](./is-same.md) - Check if dates are the same
- [isBetween](./is-between.md) - Check if date is between two dates
