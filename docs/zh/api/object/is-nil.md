# isNil

检查值是否为 null 或 undefined。

## 用法

```js
import { isNil } from 'js-cool'
```

## 签名

```typescript
function isNil(value: unknown): value is null | undefined
```

## 参数

| 参数    | 类型      | 描述       |
| ------- | --------- | ---------- |
| `value` | `unknown` | 要检查的值 |

## 返回值

`boolean` - 如果值为 null 或 undefined 返回 `true`，否则返回 `false`。

## 示例

```js
isNil(null)
// => true

isNil(undefined)
// => true

isNil('')
// => false

isNil(0)
// => false

isNil(false)
// => false

isNil([])
// => false

isNil({})
// => false
```

## 相关

- [isEmpty](./is-empty.md) - 检查值是否为空
