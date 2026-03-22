# randomColor <Badge type="info" text="since v5.5.0" />

Generate a random color.

## Usage

```js
import { randomColor } from 'js-cool'
```

## Signature

```typescript
function randomColor(): string
```

## Returns

`string` - Random hex color string.

## Examples

```js
randomColor() // '#a1b2c3'
randomColor() // '#ff6600'

// Use for styling
element.style.backgroundColor = randomColor()
```
