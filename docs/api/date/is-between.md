# isBetween <Badge type="info" text="since v6.0.0" />

Check if date is between two dates.

## Usage

```js
import { isBetween } from 'js-cool'
```

## Signature

```typescript
function isBetween(
  date: Date | string | number,
  start: Date | string | number,
  end: Date | string | number,
  inclusive?: boolean
): boolean
```

## Parameters

| Parameter   | Type                       | Description                                  |
| ----------- | -------------------------- | -------------------------------------------- |
| `date`      | `Date \| string \| number` | The date to check                            |
| `start`     | `Date \| string \| number` | The start date                               |
| `end`       | `Date \| string \| number` | The end date                                 |
| `inclusive` | `boolean`                  | Include boundaries (default: `true`)         |

## Returns

`boolean` - `true` if the date is between start and end, `false` otherwise.

## Examples

```js
isBetween('2024-01-15', '2024-01-01', '2024-01-31')
// => true

isBetween('2024-01-01', '2024-01-01', '2024-01-31')
// => true (inclusive by default)

isBetween('2024-01-01', '2024-01-01', '2024-01-31', false)
// => false (exclusive)

isBetween('2024-01-15', '2024-01-01', '2024-01-10')
// => false
```

## Related

- [isBefore](./is-before.md) - Check if date is before another
- [isAfter](./is-after.md) - Check if date is after another
- [isSame](./is-same.md) - Check if dates are the same
