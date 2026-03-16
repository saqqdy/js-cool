# isPlainObject

检查值是否为纯对象（由 `{}` 或 `new Object()` 创建）。

## 用法

```js
import { isPlainObject } from 'js-cool'
```

## 签名

```typescript
function isPlainObject(value: any): value is Record<string, any>
```

## 参数

| 参数    | 类型  | 描述       |
| ------- | ----- | ---------- |
| `value` | `any` | 要检查的值 |

## 返回值

`boolean` - 如果值是纯对象则返回 `true`。

## 示例

```js
isPlainObject({}) // true
isPlainObject({ a: 1 }) // true
isPlainObject(new Date()) // false
isPlainObject([]) // false
isPlainObject(null) // false
```
