# trim <Badge type="danger" text="deprecated" /> <Badge type="info" text="since v1.0.1" />

::: warning Deprecated
will be removed in the next major release. Use String.prototype.trim() instead.
:::

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
