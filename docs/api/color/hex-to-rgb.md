# hexToRGB

Converts hex color to RGB object.

## Usage

```js
import { hexToRGB } from 'js-cool'
```

## Signature

```typescript
interface RGBColor {
  r: number
  g: number
  b: number
}

function hexToRGB(hex: string): RGBColor | null
```

## Parameters

| Parameter | Type     | Description                                             |
| --------- | -------- | ------------------------------------------------------- |
| `hex`     | `string` | The hex color string (e.g. '#ff0000', 'ff0000', '#f00') |

## Returns

`RGBColor | null` - Returns the RGB object with r, g, b properties (0-255), or null if invalid.

## Examples

```js
hexToRGB('#ff0000')
// { r: 255, g: 0, b: 0 }

hexToRGB('#f00')
// { r: 255, g: 0, b: 0 }

hexToRGB('ff0000')
// { r: 255, g: 0, b: 0 }

hexToRGB('#000000')
// { r: 0, g: 0, b: 0 }

hexToRGB('invalid')
// null
```

## Related

- [rgbToHSL](/api/color/rgb-to-hsl) - Convert RGB to HSL
- [lighten](/api/color/lighten) - Lighten a color
- [darken](/api/color/darken) - Darken a color
- [isLightColor](/api/color/is-light-color) - Check if color is light
