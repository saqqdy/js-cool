# sorter

根据键对对象数组进行排序。

## 用法

```js
import { sorter } from 'js-cool'
```

## 签名

```typescript
function sorter<T>(
  arr: T[],
  key: keyof T,
  order?: 'asc' | 'desc'
): T[]
```

## 参数

| 参数    | 类型            | 描述                   |
| ------- | --------------- | ---------------------- |
| `arr`   | `T[]`           | 要排序的数组           |
| `key`   | `keyof T`       | 排序依据的键           |
| `order` | `'asc' \| 'desc'` | 排序顺序（默认：'asc'）|

## 返回值

`T[]` - 排序后的数组。

## 示例

```js
const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
  { name: 'Bob', age: 35 }
]

sorter(users, 'age', 'asc')
// [{ name: 'Jane', age: 25 }, { name: 'John', age: 30 }, { name: 'Bob', age: 35 }]

sorter(users, 'name', 'desc')
// [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }, { name: 'Bob', age: 35 }]
```
