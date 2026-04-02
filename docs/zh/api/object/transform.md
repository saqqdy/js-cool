# transform <Badge type="info" text="v6.0.0" />

对象的替代 reduce 方法，通过迭代器转换对象为新的累加器。

## 用法

```js
import { transform } from 'js-cool'
```

## 签名

```typescript
function transform<T extends Record<string, unknown> | unknown[], R>(
  object: T,
  iteratee: (
    accumulator: R,
    value: T extends (infer U)[] ? U : T[keyof T],
    key: T extends unknown[] ? number : keyof T,
    object: T
  ) => R | boolean | void,
  accumulator?: R
): R
```

## 参数

| 参数          | 类型         | 描述                         |
| ------------- | ------------ | ---------------------------- |
| `object`      | `T`          | 要转换的对象或数组           |
| `iteratee`    | `Function`   | 每次迭代调用的函数           |
| `accumulator` | `R`          | 初始累加器值（默认: `{}`）   |

## 返回值

`R` - 累加后的值。

## 示例

```js
// 将对象转换为值数组
transform({ a: 1, b: 2, c: 3 }, (result, value, key) => {
  result.push({ key, value })
  return result
}, [])
// [{ key: 'a', value: 1 }, { key: 'b', value: 2 }, { key: 'c', value: 3 }]

// 过滤并转换
transform({ a: 1, b: 2, c: 3, d: 4 }, (result, value, key) => {
  if (value % 2 === 0) {
    result[key] = value * 2
  }
}, {})
// { b: 4, d: 8 }

// 提前退出（返回 false）
transform({ a: 1, b: 2, c: 3 }, (result, value, key) => {
  result[key] = value
  if (key === 'b') return false
}, {})
// { a: 1, b: 2 }

// 将数组转换为对象
transform(['a', 'b', 'c'], (result, value, index) => {
  result[value] = index
}, {})
// { a: 0, b: 1, c: 2 }
```

## 注意

- 迭代器返回 `false` 可提前退出循环
- 迭代器返回值会成为新的累加器
- 支持对象和数组
