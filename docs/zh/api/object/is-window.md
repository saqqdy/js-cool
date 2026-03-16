# isWindow

检查值是否为 window 对象。

## 用法

```js
import { isWindow } from 'js-cool'
```

## 签名

```typescript
function isWindow(value: any): value is Window
```

## 参数

| 参数    | 类型  | 描述       |
| ------- | ----- | ---------- |
| `value` | `any` | 要检查的值 |

## 返回值

`boolean` - 如果值是 window 对象则返回 `true`。

## 示例

```js
isWindow(window) // true
isWindow({}) // false
isWindow(document) // false
```
