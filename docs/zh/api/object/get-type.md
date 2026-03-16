# getType

获取值的类型。

## 用法

```js
import { getType } from 'js-cool'
```

## 签名

```typescript
function getType(value: any): string
```

## 参数

| 参数     | 类型  | 描述       |
| -------- | ----- | ---------- |
| `value`  | `any` | 要检查的值 |

## 返回值

`string` - 类型名称。

## 示例

```js
getType([1, 2, 3]) // 'array'
getType({}) // 'object'
getType(null) // 'null'
getType(undefined) // 'undefined'
getType(123) // 'number'
getType('hello') // 'string'
getType(true) // 'boolean'
getType(() => {}) // 'function'
getType(new Date()) // 'date'
getType(/test/) // 'regexp'
```
