# sum

计算数组中所有值的总和。

## 用法

```js
import { sum } from 'js-cool'
```

## 签名

```typescript
function sum(array: number[]): number
```

## 参数

| 参数    | 类型       | 描述         |
| ------- | ---------- | ------------ |
| `array` | `number[]` | 要遍历的数组 |

## 返回值

`number` - 数组值的总和。

## 示例

```js
sum([1, 2, 3, 4]) // 10
sum([0.1, 0.2, 0.3]) // 0.6000000000000001
sum([]) // 0
sum([-1, -2, 3]) // 0
```

## 注意事项

- 空数组或非数组输入返回 `0`
- 受 JavaScript 浮点数精度问题影响

## 相关

- [average](/api/number/average) - 数组平均值
- [round](/api/number/round) - 四舍五入到指定精度
