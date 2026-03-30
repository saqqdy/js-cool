# mapValues <Badge type="info" text="v6.0.0" />

映射对象的值。

## 用法

```js
import { mapValues } from 'js-cool'
```

## 签名

```typescript
function mapValues<T extends Record<string, unknown>, R>(
  object: T,
  iteratee: ((value: T[keyof T], key: keyof T, object: T) => R) | keyof T[keyof T]
): Record<keyof T, R>
```

## 参数

| 参数       | 类型                                                     | 描述                 |
| ---------- | -------------------------------------------------------- | -------------------- |
| `object`   | `T`                                                      | 要遍历的对象         |
| `iteratee` | `Function \| keyof T[keyof T]`                           | 值转换函数或属性名   |

## 返回值

`Record<keyof T, R>` - 映射后的新对象。

## 示例

```js
const users = {
  fred: { user: 'fred', age: 40 },
  pebbles: { user: 'pebbles', age: 1 }
}

// 使用函数
mapValues(users, ({ age }) => age)
// { fred: 40, pebbles: 1 }

// 使用属性名
mapValues({ a: { x: 1 }, b: { x: 2 } }, 'x')
// { a: 1, b: 2 }

// 简单转换
mapValues({ a: 1, b: 2 }, n => n * 2)
// { a: 2, b: 4 }
```

## 注意

- 键保持不变，只转换值
- 返回新对象，不修改原对象
