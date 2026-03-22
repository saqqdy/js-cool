# hexToRGB

将十六进制颜色转换为 RGB 对象。

## 用法

```js
import { hexToRGB } from 'js-cool'
```

## 签名

```typescript
interface RGBColor {
  r: number
  g: number
  b: number
}

function hexToRGB(hex: string): RGBColor | null
```

## 参数

| 参数名 | 类型     | 描述                                                 |
| ------ | -------- | ---------------------------------------------------- |
| `hex`  | `string` | 十六进制颜色字符串（如 '#ff0000'、'ff0000'、'#f00'） |

## 返回值

`RGBColor | null` - 返回包含 r、g、b 属性（0-255）的 RGB 对象，如果无效则返回 null。

## 示例

```js
hexToRGB('#ff0000')
// { r: 255, g: 0, b: 0 }

hexToRGB('#f00')
// { r: 255, g: 0, b: 0 }

hexToRGB('ff0000')
// { r: 255, g: 0, b: 0 }

hexToRGB('#000000')
// { r: 0, g: 0, b: 0 }

hexToRGB('invalid')
// null
```

## 相关

- [rgbToHSL](/api/color/rgb-to-hsl) - 将 RGB 转换为 HSL
- [lighten](/api/color/lighten) - 使颜色变亮
- [darken](/api/color/darken) - 使颜色变暗
- [isLightColor](/api/color/is-light-color) - 检查颜色是否为浅色
