# RGBToHex

将 RGB 颜色转换为 Hex 颜色。

## 用法

```js
import { RGBToHex } from 'js-cool'
```

## 签名

```typescript
function RGBToHex(rgb: string): string
```

## 参数

| 参数  | 类型     | 描述           |
| ----- | -------- | -------------- |
| `rgb` | `string` | RGB 颜色字符串 |

## 返回值

`string` - Hex 颜色字符串。

## 示例

```js
RGBToHex('rgb(255, 0, 0)') // '#ff0000'
RGBToHex('rgb(0, 128, 255)') // '#0080ff'
```
