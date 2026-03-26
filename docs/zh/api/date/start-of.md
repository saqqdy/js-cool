# startOf <Badge type="info" text="since v6.0.0" />

获取时间段的开始。

## 用法

```js
import { startOf } from 'js-cool'
```

## 签名

```typescript
type DateUnit = 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond'

function startOf(date: Date | string | number, unit: DateUnit): Date
```

## 参数

| 参数   | 类型                       | 描述         |
| ------ | -------------------------- | ------------ |
| `date` | `Date \| string \| number` | 要修改的日期 |
| `unit` | `DateUnit`                 | 时间单位     |

## 返回值

`Date` - 设置为指定时间段开始的新 Date 对象。

## 示例

```js
startOf(new Date(), 'day')      // 今天 00:00:00
startOf(new Date(), 'week')     // 本周日 00:00:00
startOf(new Date(), 'month')    // 本月第一天 00:00:00
startOf(new Date(), 'year')     // 今年第一天 00:00:00
startOf(new Date(), 'hour')     // 当前小时 00:00
startOf(new Date(), 'minute')   // 当前分钟 00 秒
```

## 相关

- [endOf](./end-of.md) - 获取时间段结束
- [add](./add.md) - 给日期添加时间
- [subtract](./subtract.md) - 从日期减去时间
