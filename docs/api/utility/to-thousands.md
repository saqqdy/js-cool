# toThousands <Badge type="info" text="since v3.0.0" />

Format number with thousands separators.

## Usage

```js
import { toThousands } from 'js-cool'
```

## Signature

```typescript
function toThousands(num: number | string): string
```

## Parameters

| Parameter | Type               | Description      |
| --------- | ------------------ | ---------------- |
| `num`     | `number \| string` | Number to format |

## Returns

`string` - Formatted string.

## Examples

```js
toThousands(1234567) // '1,234,567'
toThousands('1234567.89') // '1,234,567.89'
toThousands(100) // '100'
```
