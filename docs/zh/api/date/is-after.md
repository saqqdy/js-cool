# isAfter <Badge type="info" text="since v6.0.0" />

检查日期1是否在日期2之后。

## 用法

```js
import { isAfter } from 'js-cool'
```

## 签名

```typescript
function isAfter(date1: Date | string | number, date2: Date | string | number): boolean
```

## 参数

| 参数    | 类型                       | 描述     |
| ------- | -------------------------- | -------- |
| `date1` | `Date \| string \| number` | 第一个日期 |
| `date2` | `Date \| string \| number` | 第二个日期 |

## 返回值

`boolean` - 如果日期1在日期2之后则返回 `true`，否则返回 `false`。如果任一日期无效则返回 `false`。

## 示例

```js
isAfter('2024-01-02', '2024-01-01')
// => true

isAfter(new Date('2024-01-01'), '2024-01-02')
// => false

isAfter('2024-01-01', '2024-01-01')
// => false（相同时间）
```

## 相关

- [isBefore](./is-before.md) - 检查日期是否在另一个日期之前
- [isSame](./is-same.md) - 检查两个日期是否相同
- [isBetween](./is-between.md) - 检查日期是否在两个日期之间
