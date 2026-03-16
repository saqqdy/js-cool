# complement

获取数组的补集（不在交集中的元素）。

## 用法

```js
import { complement } from 'js-cool'
```

## 签名

```typescript
function complement<T>(...args: T[][]): T[]
```

## 参数

| 参数    | 类型    | 描述           |
| ------- | ------- | -------------- |
| `args`  | `T[][]` | 要求补集的数组 |

## 返回值

`T[]` - 不在交集中的元素。

## 示例

```js
complement([1, 2, 3], [2, 3, 4]) // [1, 4]
complement([1, 2], [3, 4]) // [1, 2, 3, 4]
```

## 相关

- [intersect](/api/array/intersect) - 数组交集
- [minus](/api/array/minus) - 数组差集
