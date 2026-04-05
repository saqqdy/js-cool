# randomColor <Badge type="info" text="v5.5.0" />

生成随机十六进制颜色，支持可选的透明度通道。

## 用法

```js
import { randomColor } from 'js-cool'
```

## 签名

```typescript
function randomColor(): string
function randomColor(
  min?: number | [number, number, number],
  max?: number | [number, number, number]
): string
function randomColor(options: RandomColorOptions): string

interface RandomColorOptions {
  min?: number | [number, number, number]
  max?: number | [number, number, number]
  alpha?: boolean | number
}
```

## 参数

### 位置参数

| 参数  | 类型                              | 描述                         |
| ----- | --------------------------------- | ---------------------------- |
| `min` | `number \| [number, number, number]` | 最小 RGB 值（默认：0）    |
| `max` | `number \| [number, number, number]` | 最大 RGB 值（默认：255）  |

### 选项对象

| 属性   | 类型                              | 描述                                      |
| ------ | --------------------------------- | ----------------------------------------- |
| `min`  | `number \| [number, number, number]` | 最小 RGB 值，如 `[10, 10, 10]`         |
| `max`  | `number \| [number, number, number]` | 最大 RGB 值，如 `[255, 255, 255]`      |
| `alpha`| `boolean \| number`               | 包含透明度通道（true=随机，0-255=指定值）|

## 返回值

`string` - 随机十六进制颜色字符串（6 位或带透明度的 8 位）。

## 示例

```js
// 随机颜色
randomColor() // '#bf444b'

// 指定最小亮度
randomColor(200) // '#d6e9d7'

// 指定亮度范围
randomColor(200, 255) // '#d3f9e4'

// 使用 RGB 范围数组
randomColor([0, 0, 0], [255, 255, 255]) // '#d6e9d7'

// 使用选项对象 - 随机透明度
randomColor({ alpha: true }) // '#bf444b8a'

// 使用选项对象 - 指定透明度（0-255）
randomColor({ alpha: 128 }) // '#bf444b80'

// 组合选项
randomColor({ min: 100, max: 200, alpha: 200 }) // '#b4a89ac8'
```
