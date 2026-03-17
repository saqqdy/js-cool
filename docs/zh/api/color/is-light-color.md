# isLightColor

根据亮度判断颜色是否为浅色。

## 用法

```js
import { isLightColor } from 'js-cool'
```

## 签名

```typescript
function isLightColor(color: string): boolean
```

## 参数

| 参数名  | 类型     | 描述                                   |
| ------- | -------- | -------------------------------------- |
| `color` | `string` | 要检查的颜色（十六进制或 rgb 格式）    |

## 返回值

`boolean` - 如果颜色是浅色则返回 true，否则返回 false。

## 示例

```js
isLightColor('#ffffff')
// true

isLightColor('#000000')
// false

isLightColor('#ff0000')
// true

isLightColor('#808080')
// true（灰色被认为是浅色）

isLightColor('rgb(0, 0, 0)')
// false

isLightColor('rgb(255, 255, 255)')
// true
```

## 相关

- [lighten](/api/color/lighten) - 使颜色变亮
- [darken](/api/color/darken) - 使颜色变暗
- [hexToRGB](/api/color/hex-to-rgb) - 将十六进制转换为 RGB
- [rgbToHSL](/api/color/rgb-to-hsl) - 将 RGB 转换为 HSL
