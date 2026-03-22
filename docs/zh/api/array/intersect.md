# intersect <Badge type="info" text="v2.2.1" />

获取多个数组的交集。

## 用法

```js
import { intersect } from 'js-cool'
```

## 签名

```typescript
function intersect<T>(...args: T[][]): T[]
```

## 参数

| 参数   | 类型    | 描述           |
| ------ | ------- | -------------- |
| `args` | `T[][]` | 要求交集的数组 |

## 返回值

`T[]` - 所有数组中都存在的元素。

## 示例

```js
intersect([1, 2, 3], [2, 3, 4]) // [2, 3]
intersect([1, 2, 3], [2, 3, 4], [3, 4, 5]) // [3]
intersect(['a', 'b'], ['b', 'c']) // ['b']
```

## 相关

- [union](/api/array/union) - 数组并集
- [minus](/api/array/minus) - 数组差集
