# isSame <Badge type="info" text="since v6.0.0" />

检查两个日期在指定单位上是否相同。

## 用法

```js
import { isSame } from 'js-cool'
```

## 签名

```typescript
type DateComparisonUnit = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second'

function isSame(
  date1: Date | string | number,
  date2: Date | string | number,
  unit?: DateComparisonUnit
): boolean
```

## 参数

| 参数    | 类型                       | 描述                    |
| ------- | -------------------------- | ----------------------- |
| `date1` | `Date \| string \| number` | 第一个日期              |
| `date2` | `Date \| string \| number` | 第二个日期              |
| `unit`  | `DateComparisonUnit`       | 比较单位（默认：`'day'`）|

## 返回值

`boolean` - 如果两个日期在指定单位上相同则返回 `true`，否则返回 `false`。

## 示例

```js
isSame(new Date(), new Date(), 'day')
// => true

isSame('2024-01-01', '2024-01-02', 'month')
// => true（同月）

isSame('2024-01-01', '2024-02-01', 'year')
// => true（同年）

isSame('2024-01-01 10:00', '2024-01-01 11:00', 'day')
// => true（同一天）

isSame('2024-01-01 10:00', '2024-01-01 11:00', 'hour')
// => false（不同小时）
```

## 相关

- [isBefore](./is-before.md) - 检查日期是否在另一个日期之前
- [isAfter](./is-after.md) - 检查日期是否在另一个日期之后
- [isBetween](./is-between.md) - 检查日期是否在两个日期之间
