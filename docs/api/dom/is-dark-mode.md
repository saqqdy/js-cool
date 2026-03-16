# isDarkMode

Check if dark mode is enabled.

## Usage

```js
import { isDarkMode } from 'js-cool'
```

## Signature

```typescript
function isDarkMode(): boolean
```

## Returns

`boolean` - `true` if dark mode is enabled.

## Examples

```js
if (isDarkMode()) {
  console.log('Dark mode is active')
  document.body.classList.add('dark')
}
```
