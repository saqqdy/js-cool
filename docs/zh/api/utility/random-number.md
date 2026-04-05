# randomNumber <Badge type="info" text="v5.0.0" />

生成指定范围内的随机整数，使用均匀分布。

## 用法

```js
import { randomNumber } from 'js-cool'
```

## 签名

```typescript
function randomNumber(min?: number, max?: number): number
```

## 参数

| 参数  | 类型     | 描述                           |
| ----- | -------- | ------------------------------ |
| `min` | `number` | 最小值，包含（默认：1）        |
| `max` | `number` | 最大值，包含（默认：10）       |

## 返回值

`number` - 范围内的随机整数（包含边界值）。

## 示例

```js
// 默认范围（1-10）
randomNumber() // 8

// 自定义范围
randomNumber(1, 100) // 42

// 小范围
randomNumber(1, 3) // 2

// 单值范围
randomNumber(5, 5) // 5
```

## 注意

使用 `Math.floor()` 确保范围内所有值的均匀分布。
