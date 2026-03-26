# getQuarter <Badge type="info" text="since v6.0.0" />

获取年份的季度（1-4）。

## 用法

```js
import { getQuarter } from 'js-cool'
```

## 签名

```typescript
function getQuarter(date: Date | string | number): number
```

## 参数

| 参数   | 类型                       | 描述         |
| ------ | -------------------------- | ------------ |
| `date` | `Date \| string \| number` | 要检查的日期 |

## 返回值

`number` - 年份的季度（1-4）。

## 示例

```js
getQuarter('2024-01-15')
// => 1

getQuarter('2024-04-15')
// => 2

getQuarter('2024-07-15')
// => 3

getQuarter('2024-10-15')
// => 4

getQuarter(new Date())
// => 当前季度
```

## 相关

- [getDaysInMonth](./get-days-in-month.md) - 获取月份天数
- [getWeekOfYear](./get-week-of-year.md) - 获取年份周数
- [getDayOfYear](./get-day-of-year.md) - 获取年份天数
