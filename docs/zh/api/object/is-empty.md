# isEmpty

检查值是否为空对象、集合、Map 或 Set。

## 用法

```js
import { isEmpty } from 'js-cool'
```

## 签名

```typescript
function isEmpty(value: unknown): boolean
```

## 参数

| 参数    | 类型      | 描述       |
| ------- | --------- | ---------- |
| `value` | `unknown` | 要检查的值 |

## 返回值

`boolean` - 如果值为空返回 `true`，否则返回 `false`。

## 示例

```js
isEmpty(null)
// => true

isEmpty(undefined)
// => true

isEmpty('')
// => true

isEmpty([])
// => true

isEmpty({})
// => true

isEmpty('abc')
// => false

isEmpty([1, 2, 3])
// => false

isEmpty({ a: 1 })
// => false

isEmpty(1)
// => false

isEmpty(true)
// => false
```

## 注意

- `null` 和 `undefined` 返回 `true`
- 空字符串和空数组返回 `true`
- 空对象、Map 和 Set 返回 `true`
- 数字、布尔值和其他原始类型返回 `false`

## 相关

- [isNil](./is-nil.md) - 检查值是否为 null 或 undefined
