# randomColor <Badge type="info" text="since v5.5.0" />

Generate random hexadecimal colors with optional alpha channel support.

## Usage

```js
import { randomColor } from 'js-cool'
```

## Signature

```typescript
function randomColor(): string
function randomColor(
  min?: number | [number, number, number],
  max?: number | [number, number, number]
): string
function randomColor(options: RandomColorOptions): string

interface RandomColorOptions {
  min?: number | [number, number, number]
  max?: number | [number, number, number]
  alpha?: boolean | number
}
```

## Parameters

### Positional Arguments

| Parameter | Type                             | Description                                |
| --------- | -------------------------------- | ------------------------------------------ |
| `min`     | `number \| [number, number, number]` | Minimum RGB value(s) (default: 0)     |
| `max`     | `number \| [number, number, number]` | Maximum RGB value(s) (default: 255)    |

### Options Object

| Property | Type                             | Description                                          |
| -------- | -------------------------------- | ---------------------------------------------------- |
| `min`    | `number \| [number, number, number]` | Minimum RGB value(s), e.g. `[10, 10, 10]`        |
| `max`    | `number \| [number, number, number]` | Maximum RGB value(s), e.g. `[255, 255, 255]`      |
| `alpha`  | `boolean \| number`               | Include alpha channel (true=random, 0-255=specific) |

## Returns

`string` - Random hex color string (6 or 8 digits with alpha).

## Examples

```js
// Random color
randomColor() // '#bf444b'

// With minimum brightness
randomColor(200) // '#d6e9d7'

// With brightness range
randomColor(200, 255) // '#d3f9e4'

// With RGB range arrays
randomColor([0, 0, 0], [255, 255, 255]) // '#d6e9d7'

// With options object - random alpha
randomColor({ alpha: true }) // '#bf444b8a'

// With options object - specific alpha (0-255)
randomColor({ alpha: 128 }) // '#bf444b80'

// Combined options
randomColor({ min: 100, max: 200, alpha: 200 }) // '#b4a89ac8'
```
