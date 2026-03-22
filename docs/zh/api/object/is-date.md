# isDate <Badge type="info" text="v5.15.0" />

检查值是否为 Date 对象。

## 用法

```js
import { isDate } from 'js-cool'
```

## 签名

```typescript
function isDate(value: any): value is Date
```

## 参数

| 参数    | 类型  | 描述       |
| ------- | ----- | ---------- |
| `value` | `any` | 要检查的值 |

## 返回值

`boolean` - 如果值是 Date 则返回 `true`。

## 示例

```js
isDate(new Date()) // true
isDate('2024-01-01') // false
isDate(1704067200000) // false
```
