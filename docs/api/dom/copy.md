# copy <Badge type="info" text="since v5.0.0" />

Copy text to clipboard.

## Usage

```js
import { copy } from 'js-cool'
```

## Signature

```typescript
function copy(value: string | number): boolean | undefined
```

## Parameters

| Parameter | Type               | Description      |
| --------- | ------------------ | ---------------- |
| `value`   | `string \| number` | The text to copy |

## Returns

`boolean | undefined` - `true` if copy succeeded, `false` or `undefined` otherwise.

## Examples

```js
// Copy text
copy('Hello World') // true

// Copy number
copy(12345) // true

// Use in event handler
document.getElementById('btn').addEventListener('click', () => {
  const text = document.getElementById('content').textContent
  if (copy(text)) {
    alert('Copied!')
  }
})
```

## Notes

- Only works in browser environment
- Returns `undefined` in Node.js
- Uses `document.execCommand('copy')` internally
