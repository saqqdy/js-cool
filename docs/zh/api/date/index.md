# date & DateParser <Badge type="tip" text="since v6.0.0" />

日期处理模块，提供链式 API 和丰富的日期操作功能。

## 安装

```bash
pnpm add js-cool
```

## 使用方式

```js
// 从主入口完整导入
import { date, DateParser } from 'js-cool'

// 或导入特定函数
import {
  formatDate,
  dateDiff,
  relativeTime,
  isToday,
  isLeapYear,
  getDaysInMonth,
  addDate,
  startOf,
} from 'js-cool'
```

## 三种使用方式

### 1. DateParser 类（链式 API）

`DateParser` 类提供链式 API 用于日期操作：

```js
import { DateParser } from 'js-cool'

// 创建实例
const d = new DateParser('2024-01-15')

// 链式操作
d.add(1, 'day').format('YYYY-MM-DD')
// '2024-01-16'

d.startOf('month').format()
// '2024-01-01 00:00:00'

// 获取属性
d.year // 2024
d.month // 1
d.day // 15
```

### 2. date 命名空间（工厂 + 静态方法）

`date` 命名空间提供工厂方法和静态工具函数：

```js
import { date } from 'js-cool'

// 工厂方法 - 创建 DateParser 实例
date() // 当前时间
date('2024-01-15') // 指定日期
date.now() // 当前时间
date.parse('2024-01-15') // 解析日期

// 静态方法
date.format(new Date(), 'YYYY-MM-DD')
date.diff('2024-01-01', '2024-12-31')
date.isToday(new Date())
date.getDaysInMonth(2024, 2) // 29（闰年二月）

// 比较
date.compare('2024-01-01', '2024-01-02') // -1
date.min('2024-01-01', '2024-01-02') // 返回较早的日期
date.max('2024-01-01', '2024-01-02') // 返回较晚的日期
```

### 3. 直接导入函数

导入特定函数以获得更小的打包体积：

```js
import { formatDate, dateDiff, isToday, isLeapYear } from 'js-cool'

formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
dateDiff('2024-01-01', '2024-01-03')
isToday(new Date())
isLeapYear(2024) // true
```

## DateParser 类 API

### 构造函数

```js
const d = new DateParser() // 当前时间
const d = new DateParser('2024-01-15') // 字符串
const d = new DateParser(1705276800000) // 时间戳
const d = new DateParser(new Date()) // Date 对象
```

### 属性

```js
const d = new DateParser('2024-01-15 10:30:45')

d.date // Date 对象
d.isValid // true（日期是否有效）
d.timestamp // 1705276800000（毫秒时间戳）
d.year // 2024
d.month // 1（1-12）
d.day // 15（1-31）
d.dayOfWeek // 1（0-6，0 是周日）
d.hours // 10（0-23）
d.minutes // 30（0-59）
d.seconds // 45（0-59）
d.milliseconds // 0（0-999）
```

### 格式化方法

```js
const d = new DateParser('2024-01-15 14:30:45')

d.format() // '2024-01-15 14:30:45'
d.format('YYYY/MM/DD') // '2024/01/15'
d.format('YYYY年MM月DD日') // '2024年01月15日'
d.toISOString() // '2024-01-15T06:30:45.000Z'
d.toDateString() // '2024-01-15'
d.toTimeString() // '14:30:45'
```

### 比较方法

```js
const d = new DateParser('2024-01-15')

d.isBefore('2024-01-20') // true
d.isAfter('2024-01-10') // true
d.isSame('2024-01-15') // true
d.isSame('2024-01-15', 'month') // true（同月）
d.isToday() // false
d.isYesterday() // false
d.isTomorrow() // false
d.isWeekend() // false
d.isWeekday() // true
d.isLeapYear() // true（2024 是闰年）
```

### 操作方法（返回新实例）

```js
const d = new DateParser('2024-01-15')

// 添加时间
d.add(1, 'day').format() // '2024-01-16'
d.add(2, 'week').format() // '2024-01-29'
d.add(1, 'month').format() // '2024-02-15'
d.add(1, 'year').format() // '2025-01-15'

// 减去时间
d.subtract(1, 'day').format() // '2024-01-14'

// 时间段开始
d.startOf('day').format() // '2024-01-15 00:00:00'
d.startOf('week').format() // 本周日 00:00:00
d.startOf('month').format() // '2024-01-01 00:00:00'
d.startOf('year').format() // '2024-01-01 00:00:00'

// 时间段结束
d.endOf('day').format() // '2024-01-15 23:59:59'
d.endOf('month').format() // '2024-01-31 23:59:59'
```

### 其他方法

```js
const d = new DateParser('2024-01-15')

// 差值计算
d.diff('2024-01-20')
// { days: 5, hours: 0, minutes: 0, ... }

// 相对时间
d.relativeTime() // '5 天前'

// 获取值
d.get('year') // 2024
d.get('month') // 1
d.get('week') // 第几周

// 获取信息
d.getDaysInMonth() // 31
d.getQuarter() // 1
d.getWeekOfYear() // 3
d.getDayOfYear() // 15
```

## date 命名空间 API

### 工厂方法

```js
// 创建 DateParser 实例
date() // 当前时间
date('2024-01-15') // 指定日期
date.now() // 当前时间
date.parse('2024-01-15') // 解析日期
```

### 格式化函数

```js
date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
// '2024-01-15 10:30:45'

date.format(new Date(), 'YYYY年MM月DD日')
// '2024年01月15日'
```

### 比较函数

```js
// 检查函数
date.isToday(new Date()) // true
date.isYesterday('2024-01-14') // 取决于当前日期
date.isTomorrow('2024-01-16') // 取决于当前日期
date.isWeekend('2024-01-20') // true（周六）
date.isLeapYear(2024) // true

// 比较
date.compare('2024-01-01', '2024-01-02') // -1（第一个更早）
date.compare('2024-01-02', '2024-01-01') // 1（第一个更晚）
date.compare('2024-01-01', '2024-01-01') // 0（相同）

// 取值
date.min('2024-01-01', '2024-06-01', '2024-03-01')
// 返回 2024-01-01

date.max('2024-01-01', '2024-06-01', '2024-03-01')
// 返回 2024-06-01
```

### 计算函数

```js
// 日期差值
date.diff('2024-01-01', '2024-01-03')
// { days: 2, hours: 0, minutes: 0, seconds: 0, milliseconds: 0, total: {...} }

// 相对时间
date.relativeTime(new Date(Date.now() - 3600000))
// '1 小时前'

// 获取信息
date.getDaysInMonth(2024, 2) // 29（闰年二月）
date.getQuarter('2024-04-15') // 2
date.getWeekOfYear('2024-01-15') // 3
date.getDayOfYear('2024-02-01') // 32
```

## 独立函数 API

### formatDate

格式化日期为字符串。

```js
import { formatDate } from 'js-cool'

formatDate(new Date(), 'YYYY-MM-DD')
// '2024-01-15'

formatDate(new Date(), 'YYYY年MM月DD日 HH:mm:ss')
// '2024年01月15日 10:30:45'
```

**格式标记：**

| 标记   | 描述                         | 示例   |
| ------ | ---------------------------- | ------ |
| `YYYY` | 4位数年份                    | `2024` |
| `YY`   | 2位数年份                    | `24`   |
| `MM`   | 2位数月份（01-12）           | `01`   |
| `M`    | 月份（1-12）                 | `1`    |
| `DD`   | 2位数日期（01-31）           | `15`   |
| `D`    | 日期（1-31）                 | `15`   |
| `HH`   | 2位数小时，24小时制（00-23） | `14`   |
| `hh`   | 2位数小时，12小时制（01-12） | `02`   |
| `mm`   | 2位数分钟（00-59）           | `30`   |
| `ss`   | 2位数秒（00-59）             | `45`   |
| `SSS`  | 3位数毫秒（000-999）         | `123`  |
| `A`    | AM/PM 大写                   | `PM`   |
| `a`    | am/pm 小写                   | `pm`   |

### dateDiff

计算两个日期之间的差值。

```js
import { dateDiff } from 'js-cool'

const diff = dateDiff('2024-01-01', '2024-01-03 12:30:00')
// {
//   days: 2,
//   hours: 12,
//   minutes: 30,
//   seconds: 0,
//   milliseconds: 0,
//   total: {
//     days: 2.520833...,
//     hours: 60.5,
//     minutes: 3630,
//     seconds: 217800,
//     milliseconds: 217800000
//   }
// }
```

### relativeTime

获取相对时间字符串。

```js
import { relativeTime } from 'js-cool'

relativeTime(new Date(Date.now() - 3000))
// '刚刚'

relativeTime(new Date(Date.now() - 3600000))
// '1 小时前'

relativeTime(new Date(Date.now() + 86400000))
// '1 天后'

// 支持多语言
relativeTime(date, null, 'en') // English
relativeTime(date, null, 'ja') // Japanese
```

### isToday / isYesterday / isTomorrow

检查日期是否为今天/昨天/明天。

```js
import { isToday, isYesterday, isTomorrow } from 'js-cool'

isToday(new Date()) // true
isYesterday('2024-01-14') // 取决于当前日期
isTomorrow('2024-01-16') // 取决于当前日期
```

### isWeekend / isLeapYear

检查是否为周末或闰年。

```js
import { isWeekend, isLeapYear } from 'js-cool'

isWeekend('2024-01-20') // true（周六）
isWeekend('2024-01-15') // false（周一）

isLeapYear(2024) // true
isLeapYear(2023) // false
```

### isBefore / isAfter / isSame / isBetween

日期比较函数。

```js
import { isBefore, isAfter, isSame, isBetween } from 'js-cool'

isBefore('2024-01-01', '2024-01-02') // true
isAfter('2024-01-02', '2024-01-01') // true
isSame('2024-01-15', '2024-01-15') // true
isSame('2024-01-15 10:00', '2024-01-15 12:00', 'day') // true（同一天）

isBetween('2024-01-15', '2024-01-01', '2024-01-31') // true
isBetween('2024-01-15', '2024-01-01', '2024-01-10') // false
```

### getDaysInMonth / getQuarter / getWeekOfYear / getDayOfYear

获取日期相关信息。

```js
import { getDaysInMonth, getQuarter, getWeekOfYear, getDayOfYear } from 'js-cool'

getDaysInMonth(2024, 1) // 29（闰年二月）
getDaysInMonth(2024, 0) // 31（一月）
getQuarter('2024-04-15') // 2
getWeekOfYear('2024-01-15') // 3
getDayOfYear('2024-02-01') // 32
```

### add / subtract / startOf / endOf

日期操作函数。

```js
import { addDate, subtractDate, startOf, endOf } from 'js-cool'

// 添加时间
addDate(new Date(), 1, 'day') // 明天
addDate(new Date(), 2, 'week') // 两周后
addDate(new Date(), 1, 'month') // 一个月后

// 减去时间
subtractDate(new Date(), 1, 'day') // 昨天

// 时间段开始
startOf(new Date(), 'day') // 今天 00:00:00
startOf(new Date(), 'month') // 本月第一天 00:00:00
startOf(new Date(), 'year') // 今年第一天 00:00:00

// 时间段结束
endOf(new Date(), 'day') // 今天 23:59:59.999
endOf(new Date(), 'month') // 本月最后一天 23:59:59.999
```

## 类型定义

```ts
import type {
  DateInput,
  DateUnit,
  DateDiffResult,
  RelativeTimeLocale,
  IDateParser,
  DateAPI,
} from 'js-cool'

// 日期输入类型
type DateInput = Date | string | number

// 时间单位
type DateUnit = 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond'

// 日期差值结果
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

// 支持的语言
type RelativeTimeLocale = 'en' | 'zh' | 'ja' | 'ko' | 'de' | 'fr' | 'es'
```

## 示例

### 计算年龄

```js
import { dateDiff } from 'js-cool'

function getAge(birthday) {
  const diff = dateDiff(birthday, new Date())
  return diff.years ?? Math.floor(diff.total.days / 365)
}
```

### 倒计时

```js
import { dateDiff, formatDate } from 'js-cool'

function countdown(targetDate) {
  const diff = dateDiff(new Date(), targetDate)

  return `${diff.days}天 ${diff.hours}时 ${diff.minutes}分 ${diff.seconds}秒`
}
```

### 日历组件

```js
import { getDaysInMonth, startOf, isSame } from 'js-cool'

function getCalendarDays(year, month) {
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = startOf(new Date(year, month, 1), 'month')
  const startWeekday = firstDay.getDay()

  // 生成日历数据...
}
```

### 判断工作日

```js
import { isWeekend, isBetween } from 'js-cool'

function isWorkingDay(date, holidays = []) {
  if (isWeekend(date)) return false

  for (const holiday of holidays) {
    if (isBetween(date, holiday.start, holiday.end)) {
      return false
    }
  }

  return true
}
```

## 相关

- [formatDate](./format-date.md) - 格式化日期
- [dateDiff](./date-diff.md) - 日期差值
- [relativeTime](./relative-time.md) - 相对时间
- [isToday](./is-today.md) - 是否今天
- [getDaysInMonth](./get-days-in-month.md) - 获取月份天数
