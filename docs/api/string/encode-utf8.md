# encodeUtf8

Encode a string to UTF-8 format.

## Usage

```js
import { encodeUtf8 } from 'js-cool'
```

## Signature

```typescript
function encodeUtf8(string: string): string
```

## Parameters

| Parameter | Type     | Description          |
| --------- | -------- | -------------------- |
| `string`  | `string` | The string to encode |

## Returns

`string` - The UTF-8 encoded string.

## Examples

```js
encodeUtf8('Hello') // 'Hello'
encodeUtf8('你好') // Encoded string
```

## Related

- [decodeUtf8](/api/string/decode-utf8) - Decode UTF-8 string
