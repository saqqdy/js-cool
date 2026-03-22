# darken <Badge type="info" text="since v6.0.0" />

Darkens a color by a percentage.

## Usage

```js
import { darken } from 'js-cool'
```

## Signature

```typescript
function darken(color: string, percent: number): string
```

## Parameters

| Parameter | Type     | Description                             |
| --------- | -------- | --------------------------------------- |
| `color`   | `string` | The color to darken (hex or rgb format) |
| `percent` | `number` | The percentage to darken (0-100)        |

## Returns

`string` - Returns the darkened color as hex string.

## Examples

```js
darken('#ff0000', 20)
// '#cc0000'

darken('#ffffff', 50)
// '#808080'

darken('rgb(255, 0, 0)', 10)
// '#cc0000'

darken('#f00', 25)
// '#800000'
```

## Related

- [lighten](/api/color/lighten) - Lighten a color
- [hexToRGB](/api/color/hex-to-rgb) - Convert hex to RGB
- [rgbToHSL](/api/color/rgb-to-hsl) - Convert RGB to HSL
- [isLightColor](/api/color/is-light-color) - Check if color is light
