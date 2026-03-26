# compareDate <Badge type="info" text="since v6.0.0" />

比较两个日期。

## 用法

```js
import { compareDate } from 'js-cool'
```

## 签名

```typescript
function compareDate(
  date1: Date | string | number,
  date2: Date | string | number
): -1 | 0 | 1
```

## 参数

| 参数    | 类型                       | 描述     |
| ------- | -------------------------- | -------- |
| `date1` | `Date \| string \| number` | 第一个日期 |
| `date2` | `Date \| string \| number` | 第二个日期 |

## 返回值

`-1 | 0 | 1` - 如果日期1 < 日期2 则返回 `-1`，相等返回 `0`，日期1 > 日期2 返回 `1`。如果任一日期无效则返回 `0`。

## 示例

```js
compareDate('2024-01-01', '2024-01-02')
// => -1（第一个日期更早）

compareDate('2024-01-02', '2024-01-01')
// => 1（第一个日期更晚）

compareDate('2024-01-01', '2024-01-01')
// => 0（相同）
```

## 相关

- [isBefore](./is-before.md) - 检查日期是否在另一个日期之前
- [isAfter](./is-after.md) - 检查日期是否在另一个日期之后
- [minDate](./min-date.md) - 获取最小日期
- [maxDate](./max-date.md) - 获取最大日期
