# isIterable <Badge type="info" text="v5.7.0" />

检查值是否可迭代。

## 用法

```js
import { isIterable } from 'js-cool'
```

## 签名

```typescript
function isIterable(value: any): boolean
```

## 参数

| 参数    | 类型  | 描述       |
| ------- | ----- | ---------- |
| `value` | `any` | 要检查的值 |

## 返回值

`boolean` - 如果值可迭代则返回 `true`。

## 示例

```js
isIterable([1, 2, 3]) // true
isIterable('hello') // true
isIterable(new Set()) // true
isIterable({}) // false
isIterable(null) // false
```
