# shuffle <Badge type="info" text="v5.4.0" />

随机打乱数组顺序。

## 用法

```js
import { shuffle } from 'js-cool'
```

## 签名

```typescript
function shuffle<T>(arr: T[]): T[]
```

## 参数

| 参数  | 类型  | 描述         |
| ----- | ----- | ------------ |
| `arr` | `T[]` | 要打乱的数组 |

## 返回值

`T[]` - 打乱顺序后的新数组。

## 示例

```js
shuffle([1, 2, 3, 4, 5]) // [3, 1, 5, 2, 4]（随机）
shuffle(['a', 'b', 'c']) // ['c', 'a', 'b']（随机）
```

## 注意

- 使用 Fisher-Yates 洗牌算法
- 返回新数组，不修改原数组
- 每种排列的概率相等
