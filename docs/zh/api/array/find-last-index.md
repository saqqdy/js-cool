# findLastIndex <Badge type="info" text="v6.0.0" />

从后向前查找满足条件的第一个元素的索引。

## 用法

```js
import { findLastIndex } from 'js-cool'
```

## 签名

```typescript
function findLastIndex<T>(
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
| `fromIndex`  | `number`                                           | 开始搜索的索引（默认: 数组长度-1）|

## 返回值

`number` - 找到的元素索引，未找到返回 -1。

## 示例

```js
// 使用函数
findLastIndex([1, 2, 3, 4], n => n > 2) // 3

// 使用对象匹配
findLastIndex([{ a: 1 }, { a: 2 }, { a: 1 }], { a: 1 }) // 2

// 使用键值对
findLastIndex([{ x: 1 }, { x: 2 }, { x: 1 }], ['x', 1]) // 2

// 使用属性名
findLastIndex([{ active: false }, { active: true }, { active: true }], 'active') // 2

// 指定起始索引
findLastIndex([1, 2, 3, 2, 1], n => n === 2, 3) // 1
```

## 注意

- 从右向左搜索
- 与 `findIndex` 方向相反
