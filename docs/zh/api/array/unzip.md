# unzip <Badge type="info" text="v6.0.0" />

将元组数组解压为多个数组。

## 用法

```js
import { unzip } from 'js-cool'
```

## 签名

```typescript
function unzip<T extends unknown[]>(array: T[][]): T[][]
```

## 参数

| 参数    | 类型      | 描述             |
| ------- | --------- | ---------------- |
| `array` | `T[][]`   | 要解压的元组数组 |

## 返回值

`T[][]` - 解压后的多个数组。

## 示例

```js
unzip([['a', 1], ['b', 2], ['c', 3]])
// [['a', 'b', 'c'], [1, 2, 3]]

unzip([['a', 1, true], ['b', 2, false]])
// [['a', 'b'], [1, 2], [true, false]]
```

## 注意

- 与 `zip` 互为逆操作
- 返回新数组，不修改原数组
