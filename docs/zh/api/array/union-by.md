# unionBy <Badge type="info" text="v6.0.0" />

按条件求并集。

## 用法

```js
import { unionBy } from 'js-cool'
```

## 签名

```typescript
function unionBy<T>(...arrays: T[][]): T[]
function unionBy<T>(...args: [...arrays: T[][], iteratee: ((value: T) => unknown) | keyof T]): T[]
```

## 参数

| 参数        | 类型                                     | 描述               |
| ----------- | ---------------------------------------- | ------------------ |
| `...arrays` | `T[][]`                                  | 要合并的数组       |
| `iteratee`  | `Function \| keyof T`                    | 生成唯一键的函数或属性名 |

## 返回值

`T[]` - 合并后的新数组，每个唯一键只保留首次出现的元素。

## 示例

```js
// 使用函数
unionBy([2.1], [1.2, 2.3], Math.floor)
// [2.1, 1.2]

// 使用属性名
unionBy([{ x: 1 }], [{ x: 2 }, { x: 1 }], 'x')
// [{ x: 1 }, { x: 2 }]

// 自定义函数
unionBy([1, 2], [2, 3], n => n)
// [1, 2, 3]
```

## 注意

- 最后一个参数是 iteratee 时，前面的参数都是数组
- 相同键的元素只保留第一个
