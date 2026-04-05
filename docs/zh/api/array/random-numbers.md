# randomNumbers <Badge type="info" text="v5.4.0" />

生成 n 个随机整数，它们的和为固定值。

## 用法

```js
import { randomNumbers } from 'js-cool'
```

## 签名

```typescript
function randomNumbers(
  n?: number,
  sum?: number,
  noZero?: boolean
): number[]
```

## 参数

| 参数     | 类型      | 描述                                 |
| -------- | --------- | ------------------------------------ |
| `n`      | `number`  | 生成的整数数量（默认：1）            |
| `sum`    | `number`  | 所有生成整数的总和（默认：100）      |
| `noZero` | `boolean` | 不允许零值（默认：true）             |

## 返回值

`number[]` - 随机整数数组，其和等于指定值。

## 示例

```js
// 默认：单个数字，和为 100
randomNumbers() // [100]

// 4 个数字，和为 5（不含零）
randomNumbers(4, 5) // [1, 1, 2, 1]

// 允许零值
randomNumbers(4, 5, false) // [0, 1, 2, 2]

// 分布示例
randomNumbers(3, 100) // [33, 34, 33]
```

## 错误

当 `noZero` 为 `true` 且 `sum < n` 时会抛出错误，因为无法生成和小于数量的非零整数。
