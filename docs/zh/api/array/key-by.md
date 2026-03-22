# keyBy

创建一个对象，其键由遍历每个元素后通过迭代器生成的结果组成，对应的值为最后一个生成该键的元素。

## 用法

```js
import { keyBy } from 'js-cool'
```

## 签名

```typescript
function keyBy<T>(
  array: T[],
  iteratee: keyof T | ((value: T) => string | number)
): Record<string, T>
```

## 参数

| 参数       | 类型                                          | 描述           |
| ---------- | --------------------------------------------- | -------------- |
| `array`    | `T[]`                                         | 要遍历的数组   |
| `iteratee` | `keyof T \| ((value: T) => string \| number)` | 转换键的迭代器 |

## 返回值

`Record<string, T>` - 组合后的聚合对象，每个键映射到一个元素。

## 示例

```js
keyBy(
  [
    { id: 'a', name: 'Alice' },
    { id: 'b', name: 'Bob' },
  ],
  'id'
)
// { a: { id: 'a', name: 'Alice' }, b: { id: 'b', name: 'Bob' } }

keyBy(
  [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ],
  'id'
)
// { '1': { id: 1, name: 'Alice' }, '2': { id: 2, name: 'Bob' } }

keyBy(['a', 'b', 'c'], v => v.toUpperCase())
// { A: 'a', B: 'b', C: 'c' }
```

## 注意

- 如果输入不是数组，返回空对象
- 迭代器可以是属性名或函数
- 如果存在重复键，使用最后一个具有该键的元素
- 键在结果对象中会被转换为字符串

## 相关

- [groupBy](./group-by.md)
