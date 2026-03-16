# fixNumber

Fix number to specified decimal places.

## Usage

```js
import { fixNumber } from 'js-cool'
```

## Signature

```typescript
function fixNumber(num: number, decimals?: number): number
```

## Parameters

| Parameter  | Type     | Description                  |
| ---------- | -------- | ---------------------------- |
| `num`      | `number` | Number to fix                |
| `decimals` | `number` | Decimal places (default: 2)  |

## Returns

`number` - Fixed number.

## Examples

```js
fixNumber(3.14159) // 3.14
fixNumber(3.14159, 4) // 3.1416
fixNumber(10.5, 0) // 11
```
