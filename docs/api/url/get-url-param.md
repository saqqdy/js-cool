# getUrlParam

Get a single URL parameter value.

## Usage

```js
import { getUrlParam } from 'js-cool'
```

## Signature

```typescript
function getUrlParam(url: string, name: string): string | null
```

## Parameters

| Parameter | Type     | Description      |
| --------- | -------- | ---------------- |
| `url`     | `string` | URL string       |
| `name`    | `string` | Parameter name   |

## Returns

`string | null` - Parameter value or `null`.

## Examples

```js
getUrlParam('https://example.com?name=John&age=30', 'name')
// 'John'

getUrlParam('https://example.com?name=John', 'missing')
// null
```
