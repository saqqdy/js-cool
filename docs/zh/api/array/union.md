# union

获取多个数组的并集。

## 用法

```js
import { union } from 'js-cool'
```

## 签名

```typescript
function union<T>(...args: T[][]): T[]
```

## 参数

| 参数   | 类型    | 描述           |
| ------ | ------- | -------------- |
| `args` | `T[][]` | 要求并集的数组 |

## 返回值

`T[]` - 所有数组中的唯一元素。

## 示例

```js
union([1, 2, 3], [3, 4, 5]) // [1, 2, 3, 4, 5]
union([1, 2], [2, 3], [3, 4]) // [1, 2, 3, 4]
union(['a', 'b'], ['b', 'c']) // ['a', 'b', 'c']
```

## 相关

- [intersect](/api/array/intersect) - 数组交集
- [unique](/api/array/unique) - 数组去重
