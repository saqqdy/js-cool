# isArray <Badge type="info" text="v1.0.2" />

检查值是否为数组。

## 用法

```js
import { isArray } from 'js-cool'
```

## 签名

```typescript
function isArray(value: any): value is any[]
```

## 参数

| 参数    | 类型  | 描述       |
| ------- | ----- | ---------- |
| `value` | `any` | 要检查的值 |

## 返回值

`boolean` - 如果值是数组则返回 `true`。

## 示例

```js
isArray([1, 2, 3]) // true
isArray('hello') // false
isArray({ length: 3 }) // false
isArray(null) // false
```
