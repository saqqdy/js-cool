# sampleSize <Badge type="info" text="v6.0.0" />

从数组中获取 n 个不重复的随机元素，最多到数组大小。

## 用法

```js
import { sampleSize } from 'js-cool'
```

## 签名

```typescript
function sampleSize<T>(array: T[], n?: number): T[]
```

## 参数

| 参数    | 类型     | 描述                          |
| ------- | -------- | ----------------------------- |
| `array` | `T[]`    | 要采样的数组                  |
| `n`     | `number` | 要采样的元素数量（默认：`1`） |

## 返回值

`T[]` - n 个随机元素组成的数组。

## 示例

```js
sampleSize([1, 2, 3, 4, 5], 2)
// [3, 1]（2 个随机元素）

sampleSize([1, 2, 3], 4)
// [2, 3, 1]（所有元素打乱，因为 n > array.length）

sampleSize(['a', 'b', 'c'], 2)
// ['c', 'a']（2 个随机元素）
```

## 注意

- 如果输入不是数组或为空，返回空数组
- 如果 n 大于数组长度，返回所有打乱后的元素
- 使用 Fisher-Yates 洗牌算法进行部分选择
- 每个元素在结果中只能出现一次

## 相关

- [sample](./sample.md)
- [shuffle](./shuffle.md)
