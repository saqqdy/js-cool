# cutCHSString

Cut a Chinese string, counting Chinese characters as 2 bytes.

## Usage

```js
import { cutCHSString } from 'js-cool'
```

## Signature

```typescript
function cutCHSString(str: string, len?: number, hasDot?: boolean): string
```

## Parameters

| Parameter | Type      | Description                                  |
| --------- | --------- | -------------------------------------------- |
| `str`     | `string`  | The string to cut                            |
| `len`     | `number`  | Maximum length (default: string length)      |
| `hasDot`  | `boolean` | Add ellipsis if truncated (default: `false`) |

## Returns

`string` - The truncated string.

## Examples

```js
cutCHSString('Hello世界', 7) // 'Hello世'
cutCHSString('Hello世界你好', 8, true) // 'Hello世...'
cutCHSString('中文测试字符串', 6) // '中文测试'
```
