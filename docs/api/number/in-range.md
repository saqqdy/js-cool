# inRange

Checks if number is between start and up to, but not including, end. If end is not specified, it's set to start with start then set to 0.

## Usage

```js
import { inRange } from 'js-cool'
```

## Signature

```typescript
function inRange(number: number, start: number, end?: number): boolean
```

## Parameters

| Parameter | Type     | Description                                    |
| --------- | -------- | ---------------------------------------------- |
| `number`  | `number` | The number to check                            |
| `start`   | `number` | The start of the range                         |
| `end`     | `number` | The end of the range (exclusive, optional)     |

## Returns

`boolean` - Returns `true` if number is in range, `false` otherwise.

## Examples

```js
inRange(3, 1, 5) // true
inRange(5, 1, 5) // false (end is exclusive)
inRange(1, 5) // true (start is 0, end is 5)
inRange(5, 2) // false (start is 0, end is 2)
inRange(-3, -5, 0) // true
```

## Notes

- The `end` value is exclusive (not included in the range)
- If `end` is omitted, the range is from `0` to `start`
- Handles negative ranges correctly
- Automatically swaps `start` and `end` if `start > end`

## Related

- [clamp](/api/number/clamp) - Clamps number within range
