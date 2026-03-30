# differenceBy <Badge type="info" text="v6.0.0" />

按条件求差集。

## 用法

```js
import { differenceBy } from 'js-cool'
```

## 签名

```typescript
function differenceBy<T>(
  array: T[],
  values: T[],
  iteratee?: ((value: T) => unknown) | keyof T | null
): T[]
```

## 参数

| 参数       | 类型                                     | 描述               |
| ---------- | ---------------------------------------- | ------------------ |
| `array`    | `T[]`                                    | 要检查的数组       |
| `values`   | `T[]`                                    | 要排除的值         |
| `iteratee` | `Function \| keyof T \| null`            | 生成比较键的函数或属性名 |

## 返回值

`T[]` - 差集数组。

## 示例

```js
// 使用函数
differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor)
// [1.2]

// 使用属性名
differenceBy([{ x: 2 }, { x: 1 }], [{ x: 1 }], 'x')
// [{ x: 2 }]

// 自定义函数
differenceBy([1, 2, 3], [2], n => n * 2)
// [1, 3]  (因为 1*2=2 不在 [4] 中，3*2=6 不在 [4] 中)
```

## 注意

- 返回在第一个数组但不在第二个数组中的元素
- 使用 iteratee 生成的键进行比较
