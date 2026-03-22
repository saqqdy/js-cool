# clone

深拷贝对象或数组。

## 用法

```js
import { clone } from 'js-cool'
```

## 签名

```typescript
function clone<T>(source: T): T
```

## 参数

| 参数     | 类型 | 描述       |
| -------- | ---- | ---------- |
| `source` | `T`  | 要克隆的值 |

## 返回值

`T` - 深拷贝后的值。

## 示例

```js
// 克隆对象
const obj = { a: { b: 1 } }
const cloned = clone(obj)
cloned.a.b = 2
console.log(obj.a.b) // 1（原对象不变）

// 克隆数组
const arr = [
  [1, 2],
  [3, 4],
]
const clonedArr = clone(arr)
clonedArr[0][0] = 99
console.log(arr[0][0]) // 1（原数组不变）

// 克隆日期
const date = new Date()
const clonedDate = clone(date)
```

## 注意

- 支持循环引用
- 支持类型：Object、Array、Date、RegExp、Map、Set
- 原始类型直接返回（无需复制）
