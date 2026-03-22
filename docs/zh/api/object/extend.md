# extend

深度合并对象。

## 用法

```js
import { extend } from 'js-cool'
```

## 签名

```typescript
function extend<T extends object>(target: T, ...sources: object[]): T
```

## 参数

| 参数      | 类型       | 描述           |
| --------- | ---------- | -------------- |
| `target`  | `T`        | 目标对象       |
| `sources` | `object[]` | 要合并的源对象 |

## 返回值

`T` - 合并后的目标对象。

## 示例

```js
// 基本合并
extend({ a: 1 }, { b: 2 }) // { a: 1, b: 2 }

// 深度合并
extend({ a: { b: 1 } }, { a: { c: 2 } })
// { a: { b: 1, c: 2 } }

// 多个源对象
extend({}, { a: 1 }, { b: 2 }, { c: 3 })
// { a: 1, b: 2, c: 3 }
```

## 注意

- 会修改目标对象
- 嵌套对象会深度合并
- 数组会拼接而不是合并
