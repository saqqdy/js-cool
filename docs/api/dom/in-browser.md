# inBrowser <Badge type="info" text="since v4.5.0" />

Check if running in browser environment.

## Usage

```js
import { inBrowser } from 'js-cool'
```

## Signature

```typescript
const inBrowser: boolean
```

## Returns

`boolean` - `true` if in browser.

## Examples

```js
if (inBrowser) {
  console.log('Running in browser')
  document.body.classList.add('loaded')
}
```

## Related

- [inNodeJs](/api/dom/in-node-js) - Check if in Node.js
