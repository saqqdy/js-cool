# average

计算数组中所有值的平均值。

## 用法

```js
import { average } from 'js-cool'
```

## 签名

```typescript
function average(array: number[]): number
```

## 参数

| 参数    | 类型       | 描述         |
| ------- | ---------- | ------------ |
| `array` | `number[]` | 要遍历的数组 |

## 返回值

`number` - 数组值的平均值。

## 示例

```js
average([1, 2, 3, 4]) // 2.5
average([10, 20, 30]) // 20
average([]) // NaN
average([5]) // 5
```

## 注意事项

- 空数组或非数组输入返回 `NaN`
- 受 JavaScript 浮点数精度问题影响

## 相关

- [sum](/api/number/sum) - 数组求和
- [round](/api/number/round) - 四舍五入到指定精度
