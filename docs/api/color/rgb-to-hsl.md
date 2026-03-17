# rgbToHSL

Converts RGB to HSL.

## Usage

```js
import { rgbToHSL } from 'js-cool'
```

## Signature

```typescript
interface HSLColor {
  h: number
  s: number
  l: number
}

function rgbToHSL(r: number, g: number, b: number): HSLColor
```

## Parameters

| Parameter | Type     | Description                  |
| --------- | -------- | ---------------------------- |
| `r`       | `number` | Red value (0-255)            |
| `g`       | `number` | Green value (0-255)          |
| `b`       | `number` | Blue value (0-255)           |

## Returns

`HSLColor` - Returns the HSL object with h (0-360), s (0-100), l (0-100) properties.

## Examples

```js
rgbToHSL(255, 0, 0)
// { h: 0, s: 100, l: 50 }

rgbToHSL(0, 255, 0)
// { h: 120, s: 100, l: 50 }

rgbToHSL(0, 0, 255)
// { h: 240, s: 100, l: 50 }

rgbToHSL(128, 128, 128)
// { h: 0, s: 0, l: 50 }
```

## Related

- [hexToRGB](/api/color/hex-to-rgb) - Convert hex to RGB
- [lighten](/api/color/lighten) - Lighten a color
- [darken](/api/color/darken) - Darken a color
- [isLightColor](/api/color/is-light-color) - Check if color is light
