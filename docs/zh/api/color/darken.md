# darken

按百分比使颜色变暗。

## 用法

```js
import { darken } from 'js-cool'
```

## 签名

```typescript
function darken(color: string, percent: number): string
```

## 参数

| 参数名    | 类型     | 描述                                   |
| --------- | -------- | -------------------------------------- |
| `color`   | `string` | 要变暗的颜色（十六进制或 rgb 格式）    |
| `percent` | `number` | 变暗的百分比（0-100）                  |

## 返回值

`string` - 返回变暗后的颜色，以十六进制字符串表示。

## 示例

```js
darken('#ff0000', 20)
// '#cc0000'

darken('#ffffff', 50)
// '#808080'

darken('rgb(255, 0, 0)', 10)
// '#cc0000'

darken('#f00', 25)
// '#800000'
```

## 相关

- [lighten](/api/color/lighten) - 使颜色变亮
- [hexToRGB](/api/color/hex-to-rgb) - 将十六进制转换为 RGB
- [rgbToHSL](/api/color/rgb-to-hsl) - 将 RGB 转换为 HSL
- [isLightColor](/api/color/is-light-color) - 检查颜色是否为浅色
