# minus <Badge type="info" text="v2.2.1" />

获取在第一个数组中但不在其他数组中的元素。

## 用法

```js
import { minus } from 'js-cool'
```

## 签名

```typescript
function minus<T>(...args: T[][]): T[]
```

## 参数

| 参数   | 类型    | 描述                   |
| ------ | ------- | ---------------------- |
| `args` | `T[][]` | 第一个数组减去其他数组 |

## 返回值

`T[]` - 在第一个数组中但不在其他数组中的元素。

## 示例

```js
minus([1, 2, 3, 4], [2, 3]) // [1, 4]
minus([1, 2, 3, 4], [2], [4]) // [1, 3]
minus(['a', 'b', 'c'], ['b']) // ['a', 'c']
```

## 相关

- [intersect](/api/array/intersect) - 数组交集
- [complement](/api/array/complement) - 数组补集
