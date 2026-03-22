# RGBToHex

Convert RGB color to Hex color.

## Usage

```js
import { RGBToHex } from 'js-cool'
```

## Signature

```typescript
function RGBToHex(rgb: string): string
```

## Parameters

| Parameter | Type     | Description      |
| --------- | -------- | ---------------- |
| `rgb`     | `string` | RGB color string |

## Returns

`string` - Hex color string.

## Examples

```js
RGBToHex('rgb(255, 0, 0)') // '#ff0000'
RGBToHex('rgb(0, 128, 255)') // '#0080ff'
```
