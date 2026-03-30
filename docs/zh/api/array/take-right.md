# takeRight <Badge type="info" text="v6.0.0" />

从数组末尾取 N 个元素。

## 用法

```js
import { takeRight } from 'js-cool'
```

## 签名

```typescript
function takeRight<T>(array: T[], n?: number): T[]
```

## 参数

| 参数    | 类型     | 描述                       |
| ------- | -------- | -------------------------- |
| `array` | `T[]`    | 要处理的数组               |
| `n`     | `number` | 要取的元素数量（默认: 1） |

## 返回值

`T[]` - 数组的后 N 个元素组成的新数组。

## 示例

```js
takeRight([1, 2, 3, 4, 5], 3) // [3, 4, 5]
takeRight([1, 2, 3], 0) // []
takeRight([1, 2, 3], 5) // [1, 2, 3]
takeRight([1, 2, 3]) // [3]
```

## 注意

- 如果 `n` 小于等于 0，返回空数组
- 如果 `n` 大于数组长度，返回整个数组
- 返回新数组，不修改原数组
