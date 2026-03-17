# rgbToHSL

将 RGB 转换为 HSL。

## 用法

```js
import { rgbToHSL } from 'js-cool'
```

## 签名

```typescript
interface HSLColor {
  h: number
  s: number
  l: number
}

function rgbToHSL(r: number, g: number, b: number): HSLColor
```

## 参数

| 参数名 | 类型     | 描述                |
| ------ | -------- | ------------------- |
| `r`    | `number` | 红色值（0-255）     |
| `g`    | `number` | 绿色值（0-255）     |
| `b`    | `number` | 蓝色值（0-255）     |

## 返回值

`HSLColor` - 返回包含 h（0-360）、s（0-100）、l（0-100）属性的 HSL 对象。

## 示例

```js
rgbToHSL(255, 0, 0)
// { h: 0, s: 100, l: 50 }

rgbToHSL(0, 255, 0)
// { h: 120, s: 100, l: 50 }

rgbToHSL(0, 0, 255)
// { h: 240, s: 100, l: 50 }

rgbToHSL(128, 128, 128)
// { h: 0, s: 0, l: 50 }
```

## 相关

- [hexToRGB](/api/color/hex-to-rgb) - 将十六进制转换为 RGB
- [lighten](/api/color/lighten) - 使颜色变亮
- [darken](/api/color/darken) - 使颜色变暗
- [isLightColor](/api/color/is-light-color) - 检查颜色是否为浅色
