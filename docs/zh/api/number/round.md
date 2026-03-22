# round

将数字四舍五入到指定精度。

## 用法

```js
import { round } from 'js-cool'
```

## 签名

```typescript
function round(number: number, precision?: number): number
```

## 参数

| 参数        | 类型     | 描述                        |
| ----------- | -------- | --------------------------- |
| `number`    | `number` | 要四舍五入的数字            |
| `precision` | `number` | 四舍五入的精度（默认：`0`） |

## 返回值

`number` - 四舍五入后的数字。

## 示例

```js
round(4.006) // 4
round(4.006, 2) // 4.01
round(4060, -2) // 4100
round(4.5) // 5
round(4.4) // 4
```

## 注意事项

- 正数精度表示四舍五入到小数位
- 负数精度表示四舍五入到十位、百位等
- 内部使用 `Math.round` 并进行浮点数修正

## 相关

- [sum](/api/number/sum) - 数组求和
- [average](/api/number/average) - 数组平均值
