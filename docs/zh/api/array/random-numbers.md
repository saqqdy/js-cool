# randomNumbers

生成随机数数组。

## 用法

```js
import { randomNumbers } from 'js-cool'
```

## 签名

```typescript
function randomNumbers(
  count: number,
  min?: number,
  max?: number
): number[]
```

## 参数

| 参数    | 类型     | 描述                 |
| ------- | -------- | -------------------- |
| `count` | `number` | 随机数的数量         |
| `min`   | `number` | 最小值（默认：0）   |
| `max`   | `number` | 最大值（默认：100） |

## 返回值

`number[]` - 随机数数组。

## 示例

```js
randomNumbers(5) // [42, 17, 83, 5, 91]（0-100）
randomNumbers(3, 1, 10) // [7, 2, 9]（1-10）
```
