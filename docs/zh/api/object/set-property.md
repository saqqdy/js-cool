# setProperty <Badge type="info" text="v2.7.0" />

安全地设置嵌套属性值。

## 用法

```js
import { setProperty } from 'js-cool'
```

## 签名

```typescript
function setProperty(obj: any, path: string, value: any): void
```

## 参数

| 参数    | 类型     | 描述                   |
| ------- | -------- | ---------------------- |
| `obj`   | `any`    | 目标对象               |
| `path`  | `string` | 属性路径（如 'a.b.c'） |
| `value` | `any`    | 要设置的值             |

## 示例

```js
const obj = {}
setProperty(obj, 'a.b.c', 1)
// obj = { a: { b: { c: 1 } } }

setProperty(obj, 'users.0.name', 'John')
// obj.users[0].name = 'John'
```

## 相关

- [getProperty](/api/object/get-property) - 获取嵌套属性
