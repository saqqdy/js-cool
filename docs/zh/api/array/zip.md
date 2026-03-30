# zip <Badge type="info" text="v6.0.0" />

将多个数组合并为元组数组。

## 用法

```js
import { zip } from 'js-cool'
```

## 签名

```typescript
function zip<T extends unknown[][]>(...arrays: T): unknown[][]
```

## 参数

| 参数      | 类型        | 描述           |
| --------- | ----------- | -------------- |
| `...arrays` | `T[][]`   | 要合并的数组 |

## 返回值

`unknown[][]` - 元组数组，每个元组包含各数组对应位置的元素。

## 示例

```js
zip(['a', 'b', 'c'], [1, 2, 3])
// [['a', 1], ['b', 2], ['c', 3]]

zip(['a', 'b'], [1, 2], [true, false])
// [['a', 1, true], ['b', 2, false]]

zip([1, 2], [3, 4, 5])
// [[1, 3], [2, 4]]  // 以最短数组为准

zip(['a'], [1], [true])
// [['a', 1, true]]
```

## 注意

- 以最短的数组长度为准
- 返回新数组，不修改原数组
- 与 `unzip` 互为逆操作
