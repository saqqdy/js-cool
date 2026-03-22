# isRegExp <Badge type="info" text="v5.15.0" />

检查值是否为正则表达式。

## 用法

```js
import { isRegExp } from 'js-cool'
```

## 签名

```typescript
function isRegExp(value: any): value is RegExp
```

## 参数

| 参数    | 类型  | 描述       |
| ------- | ----- | ---------- |
| `value` | `any` | 要检查的值 |

## 返回值

`boolean` - 如果值是正则表达式则返回 `true`。

## 示例

```js
isRegExp(/test/) // true
isRegExp(new RegExp('test')) // true
isRegExp('test') // false
```
