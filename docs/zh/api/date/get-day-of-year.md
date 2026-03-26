# getDayOfYear <Badge type="info" text="since v6.0.0" />

获取年份的天数（1-366）。

## 用法

```js
import { getDayOfYear } from 'js-cool'
```

## 签名

```typescript
function getDayOfYear(date: Date | string | number): number
```

## 参数

| 参数   | 类型                       | 描述         |
| ------ | -------------------------- | ------------ |
| `date` | `Date \| string \| number` | 要检查的日期 |

## 返回值

`number` - 年份的天数（1-366）。

## 示例

```js
getDayOfYear('2024-01-01')
// => 1

getDayOfYear('2024-02-01')
// => 32

getDayOfYear('2024-12-31')
// => 366（闰年）

getDayOfYear('2023-12-31')
// => 365（非闰年）

getDayOfYear(new Date())
// => 当前年份天数
```

## 相关

- [getQuarter](./get-quarter.md) - 获取季度
- [getWeekOfYear](./get-week-of-year.md) - 获取年份周数
- [getDaysInMonth](./get-days-in-month.md) - 获取月份天数
