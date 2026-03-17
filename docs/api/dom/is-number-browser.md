# isNumberBrowser

Detect if the client is a 360 browser.

## Usage

```js
import { isNumberBrowser } from 'js-cool'
```

## Signature

```typescript
function isNumberBrowser(userAgent?: string): boolean
```

## Parameters

| Parameter   | Type     | Description                                                        |
| ----------- | -------- | ------------------------------------------------------------------ |
| `userAgent` | `string` | User agent string, defaults to navigator.userAgent if not provided |

## Returns

`boolean` - `true` if the client is a 360 browser.

## Examples

```js
// Check current browser
if (isNumberBrowser()) {
  console.log('Running in 360 browser')
}

// Check with custom user agent
const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.95 Safari/537.36 QIHU 360EE'
isNumberBrowser(ua) // true

// Another 360 browser user agent
const ua2 = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.95 Safari/537.36'
isNumberBrowser(ua2) // true
```

## Related

- [inBrowser](/api/dom/in-browser) - Check if running in browser environment
