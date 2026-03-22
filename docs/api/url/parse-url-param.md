# parseUrlParam <Badge type="info" text="since v5.0.0" />

Parse URL parameters with type conversion.

## Usage

```js
import { parseUrlParam } from 'js-cool'
```

## Signature

```typescript
function parseUrlParam(url: string, covert?: boolean): Record<string, unknown>
```

## Parameters

| Parameter | Type      | Description                      |
| --------- | --------- | -------------------------------- |
| `url`     | `string`  | URL string starting with ?       |
| `covert`  | `boolean` | Convert types (default: `false`) |

## Returns

`Record<string, unknown>` - Parsed parameters.

## Examples

```js
// Without type conversion
parseUrlParam('?name=John&age=30')
// { name: 'John', age: '30' }

// With type conversion
parseUrlParam('?count=100&active=true&price=99.99', true)
// { count: 100, active: true, price: 99.99 }

// Special values
parseUrlParam('?val=null&flag=true', true)
// { val: null, flag: true }
```
