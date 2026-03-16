# getCHSLength

Get the length of a Chinese string (Chinese characters count as 2 bytes).

## Usage

```js
import { getCHSLength } from 'js-cool'
```

## Signature

```typescript
function getCHSLength(string: string): number
```

## Parameters

| Parameter | Type     | Description         |
| --------- | -------- | ------------------- |
| `string`  | `string` | The string to count |

## Returns

`number` - The length (Chinese = 2, English = 1).

## Examples

```js
getCHSLength('Hello世界') // 9 (5 + 2*2)
getCHSLength('中文') // 4
getCHSLength('abc') // 3
```
