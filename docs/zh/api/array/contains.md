# contains

检查数组是否包含指定元素。

## 用法

```js
import { contains } from 'js-cool'
```

## 签名

```typescript
function contains<T>(arr: T[], item: T): boolean
```

## 参数

| 参数   | 类型  | 描述         |
| ------ | ----- | ------------ |
| `arr`  | `T[]` | 要搜索的数组 |
| `item` | `T`   | 要查找的元素 |

## 返回值

`boolean` - 如果元素在数组中则返回 `true`。

## 示例

```js
contains([1, 2, 3], 2) // true
contains([1, 2, 3], 4) // false
contains(['a', 'b'], 'a') // true
```
