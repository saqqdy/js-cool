# subtractDate <Badge type="info" text="since v6.0.0" />

从日期减去时间。

## 用法

```js
import { subtractDate } from 'js-cool'
```

## 签名

```typescript
type DateUnit = 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond'

function subtractDate(date: Date | string | number, value: number, unit: DateUnit): Date
```

## 参数

| 参数    | 类型                       | 描述         |
| ------- | -------------------------- | ------------ |
| `date`  | `Date \| string \| number` | 要修改的日期 |
| `value` | `number`                   | 要减去的值   |
| `unit`  | `DateUnit`                 | 时间单位     |

## 返回值

`Date` - 减去时间后的新 Date 对象。

## 示例

```js
subtractDate(new Date(), 1, 'day') // 昨天
subtractDate(new Date(), 2, 'week') // 两周前
subtractDate(new Date(), 1, 'month') // 一个月前
subtractDate(new Date(), 1, 'year') // 一年前
subtractDate(new Date(), 30, 'minute') // 30 分钟前
subtractDate(new Date(), 2, 'hour') // 2 小时前
```

## 相关

- [addDate](./add-date.md) - 给日期添加时间
- [startOf](./start-of.md) - 获取时间段开始
- [endOf](./end-of.md) - 获取时间段结束
