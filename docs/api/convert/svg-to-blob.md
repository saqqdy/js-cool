# svgToBlob

Convert SVG string to Blob.

## Usage

```js
import { svgToBlob } from 'js-cool'
```

## Signature

```typescript
function svgToBlob(svg: string): Blob
```

## Parameters

| Parameter | Type     | Description    |
| --------- | -------- | -------------- |
| `svg`     | `string` | SVG string     |

## Returns

`Blob` - Blob with SVG MIME type.

## Examples

```js
const svg = '<svg>...</svg>'
const blob = svgToBlob(svg)
// Blob { type: 'image/svg+xml' }
```
