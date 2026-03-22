# isObject <Badge type="info" text="v5.0.0" />

检查值是否为对象（非 null，非数组）。

## 用法

```js
import { isObject } from 'js-cool'
```

## 签名

```typescript
function isObject(value: any): value is object
```

## 参数

| 参数    | 类型  | 描述       |
| ------- | ----- | ---------- |
| `value` | `any` | 要检查的值 |

## 返回值

`boolean` - 如果值是对象则返回 `true`。

## 示例

```js
isObject({}) // true
isObject([]) // false
isObject(null) // false
isObject(new Date()) // true
```
