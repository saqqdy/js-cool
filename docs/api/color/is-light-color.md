# isLightColor <Badge type="info" text="since v6.0.0" />

Determines if a color is light based on its luminance.

## Usage

```js
import { isLightColor } from 'js-cool'
```

## Signature

```typescript
function isLightColor(color: string): boolean
```

## Parameters

| Parameter | Type     | Description                            |
| --------- | -------- | -------------------------------------- |
| `color`   | `string` | The color to check (hex or rgb format) |

## Returns

`boolean` - Returns true if the color is light, false otherwise.

## Examples

```js
isLightColor('#ffffff')
// true

isLightColor('#000000')
// false

isLightColor('#ff0000')
// true

isLightColor('#808080')
// true (gray is considered light)

isLightColor('rgb(0, 0, 0)')
// false

isLightColor('rgb(255, 255, 255)')
// true
```

## Related

- [lighten](/api/color/lighten) - Lighten a color
- [darken](/api/color/darken) - Darken a color
- [hexToRGB](/api/color/hex-to-rgb) - Convert hex to RGB
- [rgbToHSL](/api/color/rgb-to-hsl) - Convert RGB to HSL
