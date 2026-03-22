# getUrlParams

Parse URL parameters into an object.

## Usage

```js
import { getUrlParams } from 'js-cool'
```

## Signature

```typescript
function getUrlParams(url?: string): Record<string, string>
```

## Parameters

| Parameter | Type     | Description                         |
| --------- | -------- | ----------------------------------- |
| `url`     | `string` | URL string (default: location.href) |

## Returns

`Record<string, string>` - Object with parameter key-value pairs.

## Examples

```js
getUrlParams('https://example.com?name=John&age=30')
// { name: 'John', age: '30' }

// Use current URL
getUrlParams() // Uses window.location.href
```

## Related

- [parseUrlParam](/api/url/parse-url-param) - Parse with type conversion
