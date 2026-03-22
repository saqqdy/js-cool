# lighten <Badge type="info" text="v6.0.0" />

按百分比使颜色变亮。

## 用法

```js
import { lighten } from 'js-cool'
```

## 签名

```typescript
function lighten(color: string, percent: number): string
```

## 参数

| 参数名    | 类型     | 描述                                |
| --------- | -------- | ----------------------------------- |
| `color`   | `string` | 要变亮的颜色（十六进制或 rgb 格式） |
| `percent` | `number` | 变亮的百分比（0-100）               |

## 返回值

`string` - 返回变亮后的颜色，以十六进制字符串表示。

## 示例

```js
lighten('#ff0000', 20)
// '#ff6666'

lighten('#000000', 50)
// '#808080'

lighten('rgb(255, 0, 0)', 10)
// '#ff3333'

lighten('#f00', 25)
// '#ff8080'
```

## 相关

- [darken](/api/color/darken) - 使颜色变暗
- [hexToRGB](/api/color/hex-to-rgb) - 将十六进制转换为 RGB
- [rgbToHSL](/api/color/rgb-to-hsl) - 将 RGB 转换为 HSL
- [isLightColor](/api/color/is-light-color) - 检查颜色是否为浅色
