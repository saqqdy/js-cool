# intersectionBy <Badge type="info" text="v6.0.0" />

按条件求交集。

## 用法

```js
import { intersectionBy } from 'js-cool'
```

## 签名

```typescript
function intersectionBy<T>(
  array: T[],
  values: T[],
  iteratee?: ((value: T) => unknown) | keyof T | null
): T[]
```

## 参数

| 参数       | 类型                                     | 描述               |
| ---------- | ---------------------------------------- | ------------------ |
| `array`    | `T[]`                                    | 第一个数组         |
| `values`   | `T[]`                                    | 第二个数组         |
| `iteratee` | `Function \| keyof T \| null`            | 生成比较键的函数或属性名 |

## 返回值

`T[]` - 交集数组。

## 示例

```js
// 使用函数
intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor)
// [2.1]

// 使用属性名
intersectionBy([{ x: 1 }, { x: 2 }], [{ x: 1 }], 'x')
// [{ x: 1 }]

// 自定义函数
intersectionBy([1, 2, 3], [2, 3, 4], n => n)
// [2, 3]
```

## 注意

- 返回两个数组中共有的元素
- 使用 iteratee 生成的键进行比较
