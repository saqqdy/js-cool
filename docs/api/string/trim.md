# trim

Trim whitespace from a string.

## Usage

```js
import { trim } from 'js-cool'
```

## Signature

```typescript
function trim(string: string): string
```

## Parameters

| Parameter | Type     | Description        |
| --------- | -------- | ------------------ |
| `string`  | `string` | The string to trim |

## Returns

`string` - The trimmed string.

## Examples

```js
trim('  hello  ') // 'hello'
trim('\nhello\n') // 'hello'
```
