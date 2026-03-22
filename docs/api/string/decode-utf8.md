# decodeUtf8

Decode a UTF-8 encoded string.

## Usage

```js
import { decodeUtf8 } from 'js-cool'
```

## Signature

```typescript
function decodeUtf8(utftext: string): string
```

## Parameters

| Parameter | Type     | Description              |
| --------- | -------- | ------------------------ |
| `utftext` | `string` | The UTF-8 encoded string |

## Returns

`string` - The decoded string.

## Examples

```js
decodeUtf8(encodedString) // '你好'
```

## Related

- [encodeUtf8](/api/string/encode-utf8) - Encode string to UTF-8
