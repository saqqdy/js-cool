# endOf <Badge type="info" text="since v6.0.0" />

获取时间段的结束。

## 用法

```js
import { endOf } from 'js-cool'
```

## 签名

```typescript
type DateUnit = 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond'

function endOf(date: Date | string | number, unit: DateUnit): Date
```

## 参数

| 参数   | 类型                       | 描述         |
| ------ | -------------------------- | ------------ |
| `date` | `Date \| string \| number` | 要修改的日期 |
| `unit` | `DateUnit`                 | 时间单位     |

## 返回值

`Date` - 设置为指定时间段结束的新 Date 对象。

## 示例

```js
endOf(new Date(), 'day') // 今天 23:59:59.999
endOf(new Date(), 'week') // 本周六 23:59:59.999
endOf(new Date(), 'month') // 本月最后一天 23:59:59.999
endOf(new Date(), 'year') // 今年最后一天 23:59:59.999
endOf(new Date(), 'hour') // 当前小时 59:59.999
endOf(new Date(), 'minute') // 当前分钟 59.999 秒
```

## 相关

- [startOf](./start-of.md) - 获取时间段开始
- [addDate](./add-date.md) - 给日期添加时间
- [subtractDate](./subtract-date.md) - 从日期减去时间
