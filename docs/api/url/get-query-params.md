# getQueryParams

Get all URL parameters (behind "#", from hash).

## Usage

```js
import { getQueryParams } from 'js-cool'
```

## Signature

```typescript
function getQueryParams(url: string): Record<string, string>
function getQueryParams(url: boolean): Record<string, unknown>
function getQueryParams(url: string, covert: boolean): Record<string, unknown>
```

## Parameters

| Parameter | Type                | Description                                      |
| --------- | ------------------- | ------------------------------------------------ |
| `url`     | `string \| boolean` | URL string or boolean for type conversion        |
| `covert`  | `boolean`           | Converts specific strings to corresponding values |

## Returns

`Record<string, string | unknown>` - Object with all parameters.

## Examples

```js
// From URL string
getQueryParams('https://test.com?key1=100#/home?key1=200')
// { key1: '200' }

// With type conversion
getQueryParams('https://test.com#/page?id=100&active=true', true)
// { id: 100, active: true }

// From current page (no arguments)
// URL: https://example.com#/page?token=abc&userId=123
getQueryParams()
// { token: 'abc', userId: '123' }

// With conversion from current page
getQueryParams(true)
// { token: 'abc', userId: 123 }
```

## Related

- [getQueryParam](/api/url/get-query-param) - Get a single query parameter
- [parseUrlParam](/api/url/parse-url-param) - Parse URL parameters
