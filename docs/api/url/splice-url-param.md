# spliceUrlParam <Badge type="info" text="since v5.3.0" />

Splice parameters into URL.

## Usage

```js
import { spliceUrlParam } from 'js-cool'
```

## Signature

```typescript
function spliceUrlParam(url: string, params: Record<string, any>): string
```

## Parameters

| Parameter | Type                  | Description       |
| --------- | --------------------- | ----------------- |
| `url`     | `string`              | Base URL          |
| `params`  | `Record<string, any>` | Parameters object |

## Returns

`string` - URL with parameters.

## Examples

```js
spliceUrlParam('https://example.com', { name: 'John', age: 30 })
// 'https://example.com?name=John&age=30'

spliceUrlParam('https://example.com?foo=bar', { name: 'John' })
// 'https://example.com?foo=bar&name=John'
```
