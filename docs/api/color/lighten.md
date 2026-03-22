# lighten <Badge type="info" text="since v6.0.0" />

Lightens a color by a percentage.

## Usage

```js
import { lighten } from 'js-cool'
```

## Signature

```typescript
function lighten(color: string, percent: number): string
```

## Parameters

| Parameter | Type     | Description                              |
| --------- | -------- | ---------------------------------------- |
| `color`   | `string` | The color to lighten (hex or rgb format) |
| `percent` | `number` | The percentage to lighten (0-100)        |

## Returns

`string` - Returns the lightened color as hex string.

## Examples

```js
lighten('#ff0000', 20)
// '#ff6666'

lighten('#000000', 50)
// '#808080'

lighten('rgb(255, 0, 0)', 10)
// '#ff3333'

lighten('#f00', 25)
// '#ff8080'
```

## Related

- [darken](/api/color/darken) - Darken a color
- [hexToRGB](/api/color/hex-to-rgb) - Convert hex to RGB
- [rgbToHSL](/api/color/rgb-to-hsl) - Convert RGB to HSL
- [isLightColor](/api/color/is-light-color) - Check if color is light
