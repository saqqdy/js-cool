# dropRight <Badge type="info" text="v6.0.0" />

丢弃数组末尾 N 个元素。

## 用法

```js
import { dropRight } from 'js-cool'
```

## 签名

```typescript
function dropRight<T>(array: T[], n?: number): T[]
```

## 参数

| 参数    | 类型     | 描述                         |
| ------- | -------- | ---------------------------- |
| `array` | `T[]`    | 要处理的数组                 |
| `n`     | `number` | 要丢弃的元素数量（默认: 1） |

## 返回值

`T[]` - 丢弃后 N 个元素后的新数组。

## 示例

```js
dropRight([1, 2, 3, 4, 5], 3) // [1, 2]
dropRight([1, 2, 3], 0) // [1, 2, 3]
dropRight([1, 2, 3], 5) // []
dropRight([1, 2, 3]) // [1, 2]
```

## 注意

- 如果 `n` 小于等于 0，返回原数组的副本
- 如果 `n` 大于数组长度，返回空数组
- 返回新数组，不修改原数组
