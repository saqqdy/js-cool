# inNodeJs <Badge type="info" text="since v5.13.0" />

Check if running in Node.js environment.

## Usage

```js
import { inNodeJs } from 'js-cool'
```

## Signature

```typescript
const inNodeJs: boolean
```

## Returns

`boolean` - `true` if in Node.js.

## Examples

```js
if (inNodeJs) {
  console.log('Running in Node.js')
  // Use Node.js APIs
}
```

## Related

- [inBrowser](/api/dom/in-browser) - Check if in browser
