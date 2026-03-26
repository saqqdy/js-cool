# isBefore <Badge type="info" text="since v6.0.0" />

Check if date1 is before date2.

## Usage

```js
import { isBefore } from 'js-cool'
```

## Signature

```typescript
function isBefore(date1: Date | string | number, date2: Date | string | number): boolean
```

## Parameters

| Parameter | Type                       | Description     |
| --------- | -------------------------- | --------------- |
| `date1`   | `Date \| string \| number` | The first date  |
| `date2`   | `Date \| string \| number` | The second date |

## Returns

`boolean` - `true` if date1 is before date2, `false` otherwise. Returns `false` if either date is invalid.

## Examples

```js
isBefore('2024-01-01', '2024-01-02')
// => true

isBefore(new Date('2024-01-02'), '2024-01-01')
// => false

isBefore('2024-01-01', '2024-01-01')
// => false (same time)
```

## Related

- [isAfter](./is-after.md) - Check if date is after another
- [isSame](./is-same.md) - Check if dates are the same
- [isBetween](./is-between.md) - Check if date is between two dates
