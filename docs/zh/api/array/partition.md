# partition <Badge type="info" text="v6.0.0" />

将数组分成两组。

## 用法

```js
import { partition } from 'js-cool'
```

## 签名

```typescript
function partition<T>(
  array: T[],
  predicate?: ((value: T, index: number, array: T[]) => unknown) | keyof T | [keyof T, unknown] | string | null
): [T[], T[]]
```

## 参数

| 参数        | 类型                                                        | 描述         |
| ----------- | ----------------------------------------------------------- | ------------ |
| `array`     | `T[]`                                                       | 要分区的数组 |
| `predicate` | `Function \| keyof T \| [keyof T, unknown] \| string \| null` | 判断条件   |

## 返回值

`[T[], T[]]` - 两个数组的元组，第一个为满足条件的元素，第二个为不满足条件的元素。

## 示例

```js
const users = [
  { user: 'barney', age: 36, active: true },
  { user: 'fred', age: 40, active: false },
  { user: 'pebbles', age: 1, active: true }
]

// 使用函数
partition(users, ({ active }) => active)
// [
//   [{ user: 'barney', age: 36, active: true }, { user: 'pebbles', age: 1, active: true }],
//   [{ user: 'fred', age: 40, active: false }]
// ]

// 使用键值对
partition([{ a: 1 }, { a: 2 }, { a: 1 }], ['a', 1])
// [[{ a: 1 }, { a: 1 }], [{ a: 2 }]]

// 使用属性名（检查是否为真值）
partition([0, 1, false, true])
// [[1, true], [0, false]]

// 简单条件
partition([1, 2, 3, 4], n => n % 2 === 0)
// [[2, 4], [1, 3]]
```

## 注意

- 返回两个数组组成的元组
- 保持原始顺序
