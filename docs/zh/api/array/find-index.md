# findIndex <Badge type="info" text="v6.0.0" />

查找满足条件的第一个元素的索引。

## 用法

```js
import { findIndex } from 'js-cool'
```

## 签名

```typescript
function findIndex<T>(
  array: T[],
  predicate: ((value: T, index: number, array: T[]) => unknown) | Partial<T> | [keyof T, unknown] | string | null | undefined,
  fromIndex?: number
): number
```

## 参数

| 参数         | 类型                                               | 描述                           |
| ------------ | -------------------------------------------------- | ------------------------------ |
| `array`      | `T[]`                                              | 要搜索的数组                   |
| `predicate`  | `Function \| Partial<T> \| [keyof T, unknown] \| string \| null` | 判断条件 |
| `fromIndex`  | `number`                                           | 开始搜索的索引（默认: 0）      |

## 返回值

`number` - 找到的元素索引，未找到返回 -1。

## 示例

```js
const users = [
  { user: 'barney', active: false },
  { user: 'fred', active: false },
  { user: 'pebbles', active: true }
]

// 使用函数
findIndex(users, ({ active }) => active) // 2

// 使用对象匹配
findIndex(users, { user: 'fred' }) // 1

// 使用键值对
findIndex(users, ['user', 'barney']) // 0

// 使用属性名（检查是否为真值）
findIndex(users, 'active') // 2

// 简单数组
findIndex([1, 2, 3], n => n > 1) // 1

// 指定起始索引
findIndex([1, 2, 3, 2], n => n === 2, 2) // 3
```

## 注意

- 支持多种 predicate 形式，灵活使用
- 从 `fromIndex` 开始向后搜索
- 如果 `fromIndex` 为负数，从数组末尾计算
