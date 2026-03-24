# date & DateParser <Badge type="tip" text="since v6.0.0" />

Date manipulation module with chainable API and comprehensive date operations.

## Installation

```bash
pnpm add js-cool
```

## Usage

```js
// Import from main entry
import { date, DateParser } from 'js-cool'

// Or import specific functions
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

## Three Ways to Use

### 1. DateParser Class (Chainable API)

The `DateParser` class provides a chainable API for date operations:

```js
import { DateParser } from 'js-cool'

// Create instance
const d = new DateParser('2024-01-15')

// Chain operations
d.add(1, 'day').format('YYYY-MM-DD')
// '2024-01-16'

d.startOf('month').format()
// '2024-01-01 00:00:00'

// Get properties
d.year // 2024
d.month // 1
d.day // 15
```

### 2. date Namespace (Factory + Static Methods)

The `date` namespace provides factory methods and static utilities:

```js
import { date } from 'js-cool'

// Factory method - create DateParser instance
date() // now
date('2024-01-15') // specific date
date.now() // now
date.parse('2024-01-15') // parse date

// Static methods
date.format(new Date(), 'YYYY-MM-DD')
date.diff('2024-01-01', '2024-12-31')
date.isToday(new Date())
date.getDaysInMonth(2024, 2) // 29 (leap year Feb)

// Compare
date.compare('2024-01-01', '2024-01-02') // -1
date.min('2024-01-01', '2024-01-02') // earlier date
date.max('2024-01-01', '2024-01-02') // later date
```

### 3. Direct Function Import

Import specific functions for smaller bundle size:

```js
import { formatDate, dateDiff, isToday, isLeapYear } from 'js-cool'

formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
dateDiff('2024-01-01', '2024-01-03')
isToday(new Date())
isLeapYear(2024) // true
```

## DateParser Class API

### Constructor

```js
const d = new DateParser() // now
const d = new DateParser('2024-01-15') // string
const d = new DateParser(1705276800000) // timestamp
const d = new DateParser(new Date()) // Date object
```

### Properties

```js
const d = new DateParser('2024-01-15 10:30:45')

d.date // Date object
d.isValid // true (if date is valid)
d.timestamp // 1705276800000 (milliseconds)
d.year // 2024
d.month // 1 (1-12)
d.day // 15 (1-31)
d.dayOfWeek // 1 (0-6, 0 is Sunday)
d.hours // 10 (0-23)
d.minutes // 30 (0-59)
d.seconds // 45 (0-59)
d.milliseconds // 0 (0-999)
```

### Formatting Methods

```js
const d = new DateParser('2024-01-15 14:30:45')

d.format() // '2024-01-15 14:30:45'
d.format('YYYY/MM/DD') // '2024/01/15'
d.toISOString() // '2024-01-15T06:30:45.000Z'
d.toDateString() // '2024-01-15'
d.toTimeString() // '14:30:45'
```

### Comparison Methods

```js
const d = new DateParser('2024-01-15')

d.isBefore('2024-01-20') // true
d.isAfter('2024-01-10') // true
d.isSame('2024-01-15') // true
d.isSame('2024-01-15', 'month') // true (same month)
d.isToday() // false
d.isYesterday() // false
d.isTomorrow() // false
d.isWeekend() // false
d.isWeekday() // true
d.isLeapYear() // true (2024 is leap year)
```

### Manipulation Methods (return new instance)

```js
const d = new DateParser('2024-01-15')

// Add time
d.add(1, 'day').format() // '2024-01-16'
d.add(2, 'week').format() // '2024-01-29'
d.add(1, 'month').format() // '2024-02-15'
d.add(1, 'year').format() // '2025-01-15'

// Subtract time
d.subtract(1, 'day').format() // '2024-01-14'

// Start of period
d.startOf('day').format() // '2024-01-15 00:00:00'
d.startOf('week').format() // This Sunday 00:00:00
d.startOf('month').format() // '2024-01-01 00:00:00'
d.startOf('year').format() // '2024-01-01 00:00:00'

// End of period
d.endOf('day').format() // '2024-01-15 23:59:59'
d.endOf('month').format() // '2024-01-31 23:59:59'
```

### Other Methods

```js
const d = new DateParser('2024-01-15')

// Difference
d.diff('2024-01-20')
// { days: 5, hours: 0, minutes: 0, ... }

// Relative time
d.relativeTime() // '5 days ago'

// Get value
d.get('year') // 2024
d.get('month') // 1
d.get('week') // week number

// Get info
d.getDaysInMonth() // 31
d.getQuarter() // 1
d.getWeekOfYear() // 3
d.getDayOfYear() // 15
```

## date Namespace API

### Factory Methods

```js
// Create DateParser instance
date() // now
date('2024-01-15') // specific date
date.now() // now
date.parse('2024-01-15') // parse date
```

### Formatting Function

```js
date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
// '2024-01-15 10:30:45'
```

### Comparison Functions

```js
// Check functions
date.isToday(new Date()) // true
date.isYesterday('2024-01-14') // depends on current date
date.isTomorrow('2024-01-16') // depends on current date
date.isWeekend('2024-01-20') // true (Saturday)
date.isLeapYear(2024) // true

// Compare
date.compare('2024-01-01', '2024-01-02') // -1 (first is earlier)
date.compare('2024-01-02', '2024-01-01') // 1 (first is later)
date.compare('2024-01-01', '2024-01-01') // 0 (same)

// Min/Max
date.min('2024-01-01', '2024-06-01', '2024-03-01')
// Returns 2024-01-01

date.max('2024-01-01', '2024-06-01', '2024-03-01')
// Returns 2024-06-01
```

### Calculation Functions

```js
// Date difference
date.diff('2024-01-01', '2024-01-03')
// { days: 2, hours: 0, minutes: 0, seconds: 0, milliseconds: 0, total: {...} }

// Relative time
date.relativeTime(new Date(Date.now() - 3600000))
// '1 hour ago'

// Get info
date.getDaysInMonth(2024, 2) // 29 (leap year Feb)
date.getQuarter('2024-04-15') // 2
date.getWeekOfYear('2024-01-15') // 3
date.getDayOfYear('2024-02-01') // 32
```

## Standalone Functions API

### formatDate

Format date to string.

```js
import { formatDate } from 'js-cool'

formatDate(new Date(), 'YYYY-MM-DD')
// '2024-01-15'

formatDate(new Date(), 'YYYY年MM月DD日 HH:mm:ss')
// '2024年01月15日 10:30:45'
```

**Format Tokens:**

| Token  | Description                   | Example |
| ------ | ----------------------------- | ------- |
| `YYYY` | 4-digit year                  | `2024`  |
| `YY`   | 2-digit year                  | `24`    |
| `MM`   | 2-digit month (01-12)         | `01`    |
| `M`    | Month (1-12)                  | `1`     |
| `DD`   | 2-digit day (01-31)           | `15`    |
| `D`    | Day (1-31)                    | `15`    |
| `HH`   | 2-digit hour, 24h (00-23)     | `14`    |
| `hh`   | 2-digit hour, 12h (01-12)     | `02`    |
| `mm`   | 2-digit minute (00-59)        | `30`    |
| `ss`   | 2-digit second (00-59)        | `45`    |
| `SSS`  | 3-digit millisecond (000-999) | `123`   |
| `A`    | AM/PM uppercase               | `PM`    |
| `a`    | am/pm lowercase               | `pm`    |

### dateDiff

Calculate difference between two dates.

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

Get relative time string.

```js
import { relativeTime } from 'js-cool'

relativeTime(new Date(Date.now() - 3000))
// 'just now'

relativeTime(new Date(Date.now() - 3600000))
// '1 hour ago'

relativeTime(new Date(Date.now() + 86400000))
// '1 day later'

// Multi-language support
relativeTime(date, null, 'en') // English
relativeTime(date, null, 'zh') // Chinese
```

### isToday / isYesterday / isTomorrow

Check if date is today/yesterday/tomorrow.

```js
import { isToday, isYesterday, isTomorrow } from 'js-cool'

isToday(new Date()) // true
isYesterday('2024-01-14') // depends on current date
isTomorrow('2024-01-16') // depends on current date
```

### isWeekend / isLeapYear

Check if weekend or leap year.

```js
import { isWeekend, isLeapYear } from 'js-cool'

isWeekend('2024-01-20') // true (Saturday)
isWeekend('2024-01-15') // false (Monday)

isLeapYear(2024) // true
isLeapYear(2023) // false
```

### isBefore / isAfter / isSame / isBetween

Date comparison functions.

```js
import { isBefore, isAfter, isSame, isBetween } from 'js-cool'

isBefore('2024-01-01', '2024-01-02') // true
isAfter('2024-01-02', '2024-01-01') // true
isSame('2024-01-15', '2024-01-15') // true
isSame('2024-01-15 10:00', '2024-01-15 12:00', 'day') // true (same day)

isBetween('2024-01-15', '2024-01-01', '2024-01-31') // true
isBetween('2024-01-15', '2024-01-01', '2024-01-10') // false
```

### getDaysInMonth / getQuarter / getWeekOfYear / getDayOfYear

Get date-related info.

```js
import { getDaysInMonth, getQuarter, getWeekOfYear, getDayOfYear } from 'js-cool'

getDaysInMonth(2024, 1) // 29 (leap year Feb)
getDaysInMonth(2024, 0) // 31 (January)
getQuarter('2024-04-15') // 2
getWeekOfYear('2024-01-15') // 3
getDayOfYear('2024-02-01') // 32
```

### add / subtract / startOf / endOf

Date manipulation functions.

```js
import { addDate, subtractDate, startOf, endOf } from 'js-cool'

// Add time
addDate(new Date(), 1, 'day') // tomorrow
addDate(new Date(), 2, 'week') // 2 weeks later
addDate(new Date(), 1, 'month') // 1 month later

// Subtract time
subtractDate(new Date(), 1, 'day') // yesterday

// Start of period
startOf(new Date(), 'day') // today 00:00:00
startOf(new Date(), 'month') // 1st of month 00:00:00
startOf(new Date(), 'year') // Jan 1st 00:00:00

// End of period
endOf(new Date(), 'day') // today 23:59:59.999
endOf(new Date(), 'month') // last day of month 23:59:59
```

## Type Definitions

```ts
import type {
  DateInput,
  DateUnit,
  DateDiffResult,
  RelativeTimeLocale,
  IDateParser,
  DateAPI,
} from 'js-cool'

// Date input type
type DateInput = Date | string | number

// Date unit
type DateUnit = 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond'

// Date difference result
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

// Supported locales
type RelativeTimeLocale = 'en' | 'zh' | 'ja' | 'ko' | 'de' | 'fr' | 'es'
```

## Examples

### Calculate Age

```js
import { dateDiff } from 'js-cool'

function getAge(birthday) {
  const diff = dateDiff(birthday, new Date())
  return diff.years ?? Math.floor(diff.total.days / 365)
}
```

### Countdown

```js
import { dateDiff } from 'js-cool'

function countdown(targetDate) {
  const diff = dateDiff(new Date(), targetDate)

  return `${diff.days}d ${diff.hours}h ${diff.minutes}m ${diff.seconds}s`
}
```

### Calendar Component

```js
import { getDaysInMonth, startOf } from 'js-cool'

function getCalendarDays(year, month) {
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = startOf(new Date(year, month, 1), 'month')
  const startWeekday = firstDay.getDay()

  // Generate calendar data...
}
```

### Check Working Day

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

## Related

- [formatDate](./format-date.md) - Format date
- [dateDiff](./date-diff.md) - Date difference
- [relativeTime](./relative-time.md) - Relative time
- [isToday](./is-today.md) - Check if today
- [getDaysInMonth](./get-days-in-month.md) - Get days in month
