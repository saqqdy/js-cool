# getQueryParam <Badge type="info" text="since v5.0.0" />

Get a single query parameter (behind "#", from hash).

## Usage

```js
import { getQueryParam } from 'js-cool'
```

## Signature

```typescript
function getQueryParam(key: string): string | undefined
function getQueryParam(key: string, url: string): string | undefined
```

## Parameters

| Parameter | Type     | Description                                               |
| --------- | -------- | --------------------------------------------------------- |
| `key`     | `string` | Parameter name                                            |
| `url`     | `string` | URL string (optional, uses location.href if not provided) |

## Returns

`string | undefined` - Parameter value or `undefined`.

## Examples

```js
// From current page URL hash
// URL: https://example.com#/page?token=abc123
getQueryParam('token')
// 'abc123'

// With custom URL
getQueryParam('key1', 'https://test.com?key1=100#/home?key1=200')
// '200' (gets value from hash, not search)

// Missing parameter
getQueryParam('nonexistent')
// undefined

// URL encoded values
getQueryParam('name', 'https://example.com#/page?name=John%20Doe')
// 'John Doe'
```

## Related

- [getQueryParams](/api/url/get-query-params) - Get all query parameters
- [parseUrlParam](/api/url/parse-url-param) - Parse URL parameters
