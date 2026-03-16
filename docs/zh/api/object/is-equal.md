# isEqual

深度比较两个值。

## 用法

```js
import { isEqual } from 'js-cool'
```

## 签名

```typescript
function isEqual<T, P>(a: T, b: P): boolean
```

## 参数

| 参数 | 类型 | 描述     |
| ---- | ---- | -------- |
| `a`  | `T`  | 第一个值 |
| `b`  | `P`  | 第二个值 |

## 返回值

`boolean` - 如果值深度相等则返回 `true`。

## 示例

```js
// 对象
isEqual({ a: 1 }, { a: 1 }) // true
isEqual({ a: { b: 1 } }, { a: { b: 1 } }) // true

// 数组
isEqual([1, 2, 3], [1, 2, 3]) // true
isEqual([1, 2], [2, 1]) // false

// 特殊值
isEqual(NaN, NaN) // true
isEqual(0, -0) // false
```
