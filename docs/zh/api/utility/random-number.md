# randomNumber

生成指定范围内的随机数。

## 用法

```js
import { randomNumber } from 'js-cool'
```

## 签名

```typescript
function randomNumber(min?: number, max?: number): number
```

## 参数

| 参数  | 类型     | 描述                |
| ----- | -------- | ------------------- |
| `min` | `number` | 最小值（默认：0）   |
| `max` | `number` | 最大值（默认：100） |

## 返回值

`number` - 范围内的随机数。

## 示例

```js
randomNumber() // 0-100
randomNumber(1, 10) // 1-10
randomNumber(0, 1) // 0 或 1
```
