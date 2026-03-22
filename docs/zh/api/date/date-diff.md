# dateDiff <Badge type="info" text="v6.0.0" />

计算两个日期之间的差值。

## 用法

```js
import { dateDiff } from 'js-cool'
```

## 签名

```typescript
interface DateDiffResult {
  days: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
  total: {
    days: number
    hours: number
    minutes: number
    seconds: number
    milliseconds: number
  }
}

function dateDiff(date1: Date | string | number, date2: Date | string | number): DateDiffResult
```

## 参数

| 参数名  | 类型                       | 描述       |
| ------- | -------------------------- | ---------- |
| `date1` | `Date \| string \| number` | 第一个日期 |
| `date2` | `Date \| string \| number` | 第二个日期 |

## 返回值

`DateDiffResult` - 包含两个日期差值的对象，具有以下属性：

| 属性                 | 类型     | 描述                |
| -------------------- | -------- | ------------------- |
| `days`               | `number` | 差值中的整天数      |
| `hours`              | `number` | 剩余小时数（0-23）  |
| `minutes`            | `number` | 剩余分钟数（0-59）  |
| `seconds`            | `number` | 剩余秒数（0-59）    |
| `milliseconds`       | `number` | 剩余毫秒数（0-999） |
| `total.days`         | `number` | 总差值天数          |
| `total.hours`        | `number` | 总差值小时数        |
| `total.minutes`      | `number` | 总差值分钟数        |
| `total.seconds`      | `number` | 总差值秒数          |
| `total.milliseconds` | `number` | 总差值毫秒数        |

如果任一日期无效，返回所有属性为零值的对象。

## 示例

```js
const diff = dateDiff('2024-01-01', '2024-01-03')
// => { days: 2, hours: 0, minutes: 0, seconds: 0, milliseconds: 0, total: { days: 2, hours: 48, minutes: 2880, seconds: 172800, milliseconds: 172800000 } }

const diff = dateDiff(new Date('2024-01-01'), new Date('2024-01-02 12:30:00'))
// => { days: 1, hours: 12, minutes: 30, seconds: 0, milliseconds: 0, ... }

const diff = dateDiff('2024-01-01 10:00:00', '2024-01-01 12:30:45')
// => { days: 0, hours: 2, minutes: 30, seconds: 45, milliseconds: 0, ... }
```

## 相关

- [formatDate](./format-date.md) - 格式化日期字符串
- [relativeTime](./relative-time.md) - 获取相对时间字符串
- [isToday](./is-today.md) - 检查日期是否为今天
