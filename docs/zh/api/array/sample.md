# sample

从数组中获取一个随机元素。

## 用法

```js
import { sample } from 'js-cool'
```

## 签名

```typescript
function sample<T>(array: T[]): T | undefined
```

## 参数

| 参数    | 类型  | 描述         |
| ------- | ----- | ------------ |
| `array` | `T[]` | 要采样的数组 |

## 返回值

`T | undefined` - 数组中的随机元素，如果数组为空或不是数组则返回 `undefined`。

## 示例

```js
sample([1, 2, 3, 4])
// 2（随机元素）

sample(['a', 'b', 'c'])
// 'b'（随机元素）

sample([])
// undefined
```

## 注意

- 如果输入不是数组或为空，返回 `undefined`
- 每个元素被选中的概率相等

## 相关

- [sampleSize](./sample-size.md)
- [shuffle](./shuffle.md)
