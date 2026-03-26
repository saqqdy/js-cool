# getWeekOfYear <Badge type="info" text="since v6.0.0" />

获取年份的周数（ISO 周）。

## 用法

```js
import { getWeekOfYear } from 'js-cool'
```

## 签名

```typescript
function getWeekOfYear(date: Date | string | number): number
```

## 参数

| 参数   | 类型                       | 描述         |
| ------ | -------------------------- | ------------ |
| `date` | `Date \| string \| number` | 要检查的日期 |

## 返回值

`number` - 年份的 ISO 周数（1-53）。

## 示例

```js
getWeekOfYear('2024-01-01')
// => 1

getWeekOfYear('2024-01-15')
// => 3

getWeekOfYear('2024-12-31')
// => 1（下一年的第一周）

getWeekOfYear(new Date())
// => 当前周数
```

## 相关

- [getQuarter](./get-quarter.md) - 获取季度
- [getDayOfYear](./get-day-of-year.md) - 获取年份天数
- [getDaysInMonth](./get-days-in-month.md) - 获取月份天数
