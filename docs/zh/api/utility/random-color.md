# randomColor

生成随机颜色。

## 用法

```js
import { randomColor } from 'js-cool'
```

## 签名

```typescript
function randomColor(): string
```

## 返回值

`string` - 随机十六进制颜色字符串。

## 示例

```js
randomColor() // '#a1b2c3'
randomColor() // '#ff6600'

// 用于样式设置
element.style.backgroundColor = randomColor()
```
